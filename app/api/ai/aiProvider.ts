import { AIAction } from "./types"
import { geminiProvider } from "./geminiProvider";
import { functionGemmaProvider } from "./functionGemmaProvider";

type Provider = "gemini" | "functionGemma";

export async function aiProvider(
  message: string,
  provider: Provider = "gemini"
): Promise<AIAction> {
  switch (provider) {
    case "functionGemma":
      return functionGemmaProvider(message);

    case "gemini":
    default:
      return geminiProvider(message);
  }
}
