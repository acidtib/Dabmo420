/**
 * Reads a prompt file and returns its contents as a string.
 * 
 * @param {string} filePath - The path to the prompt file to read
 * @returns {Promise<string>} A promise that resolves to the contents of the prompt file
 * @throws {Error} If the prompt file cannot be read
 */
async function readPromptFile(filePath: string): Promise<string> {
  try {
    const data = await Deno.readTextFile(filePath);
    return data.trim();
  } catch (error) {
    throw new Error(`Failed to read prompt from ${filePath}:`, { cause: error });
  }
}

/**
 * Returns a system prompt that sets the context for the LLM.
 * 
 * @returns {Promise<string>} A promise that resolves to a system message string containing instructions for the LLM
 */
export async function promptsSystem(): Promise<string> {
  const basePath = new URL('../../prompts/system.txt', import.meta.url).pathname;
  return await readPromptFile(basePath);
}