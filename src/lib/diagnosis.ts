export type Severity = 'Low' | 'Medium' | 'High' | 'Healthy';

export interface DiagnosisResult {
  diseaseName: string;
  confidence: number;
  severity: Severity;
  symptoms: string[];
  remediation: {
    organic: string[];
    chemical: string[];
    wateringSoil: string[];
  };
  isMock?: boolean;
  notice?: string;
}

const SYSTEM_INSTRUCTIONS = `You are an expert Plant Pathologist AI. Look closely at the SPECIFIC image provided. Extract visual symptoms, identify the true disease name (e.g. Early Blight, Powdery Mildew, Rust, Citrus Canker, Healthy, etc.), estimate severity level, and generate actionable low-cost remediation steps for farmers.

Respond ONLY with a JSON object (no markdown fences, no prose) with this exact shape:
{
  "diseaseName": string,
  "confidence": number (0-100, the percentage certainty),
  "severity": "Low" | "Medium" | "High" | "Healthy",
  "symptoms": string[] (short visual bullet points),
  "remediation": {
    "organic": string[] (actionable low-cost organic steps),
    "chemical": string[] (include dosage & safety warning),
    "wateringSoil": string[] (moisture & soil advice)
  }
}`;

const MODEL_NAME = 'gemini-1.5-flash';

function fileToBase64(
  file: File,
): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] ?? '';
      resolve({ base64, mimeType: file.type || 'image/jpeg' });
    };
    reader.onerror = () => reject(new Error('Could not read image file.'));
    reader.readAsDataURL(file);
  });
}

function extractJson(text: string): DiagnosisResult {
  const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON found in response.');
  const parsed = JSON.parse(
    cleaned.slice(start, end + 1),
  ) as Partial<DiagnosisResult>;

  const severity = (parsed.severity ?? 'Low') as Severity;
  return {
    diseaseName: parsed.diseaseName ?? 'Unknown',
    confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0,
    severity,
    symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
    remediation: {
      organic: parsed.remediation?.organic ?? [],
      chemical: parsed.remediation?.chemical ?? [],
      wateringSoil: parsed.remediation?.wateringSoil ?? [],
    },
  };
}

function mockDiagnosis(): DiagnosisResult {
  return {
    diseaseName: 'Early Blight (Alternaria solani) — Demo Sample',
    confidence: 78,
    severity: 'Medium',
    symptoms: [
      'Dark brown concentric rings on older leaves',
      'Yellowing around affected leaf tissue',
      'Leaves appear slightly curled at the edges',
    ],
    remediation: {
      organic: [
        'Remove and destroy infected leaves to stop spread',
        'Apply neem oil spray every 7–10 days',
        'Improve air circulation by pruning crowded branches',
      ],
      chemical: [
        'Spray chlorothalonil at 2 g/L water every 7 days',
        'Wear gloves and a mask during application',
        'Do not spray within 7 days of harvest',
      ],
      wateringSoil: [
        'Water at the base in the morning; avoid wetting leaves',
        'Ensure soil drains well; avoid waterlogging',
        'Add mulch to retain even soil moisture',
      ],
    },
    isMock: true,
    notice:
      'Showing sample data for demonstration. Add your Gemini API key to VITE_GEMINI_API_KEY in the .env file to run live AI analysis.',
  };
}

function isKeyMissing(apiKey: string | undefined): boolean {
  return (
    !apiKey ||
    apiKey.trim() === '' ||
    apiKey.startsWith('AIzaSy...') ||
    apiKey === 'YOUR_ACTUAL_GEMINI_KEY_HERE'
  );
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
  error?: { message?: string };
}

export async function diagnoseLeaf(
  file: File,
  signal?: AbortSignal,
): Promise<DiagnosisResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (isKeyMissing(apiKey)) {
    return mockDiagnosis();
  }

  const { base64, mimeType } = await fileToBase64(file);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTIONS }],
    },
    contents: [
      {
        role: 'user',
        parts: [
          { inline_data: { mime_type: mimeType, data: base64 } },
          {
            text: 'Analyze this leaf image and return the structured JSON diagnosis.',
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.4,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(
        `Gemini API ${response.status}: ${errText || response.statusText}`,
      );
    }

    const data = (await response.json()) as GeminiResponse;

    if (data.error) {
      throw new Error(data.error.message ?? 'Unknown Gemini error.');
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Gemini returned an empty response.');
    }

    return extractJson(text);
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }
    const message =
      err instanceof Error ? err.message : 'Gemini API request failed.';
    const mock = mockDiagnosis();
    mock.notice = `Live analysis failed (${message}). Showing sample data instead. Check your VITE_GEMINI_API_KEY.`;
    return mock;
  }
}
