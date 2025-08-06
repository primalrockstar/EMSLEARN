export async function fetchChapters() {
  const response = await fetch('/emt-chapters-final.json');
  if (!response.ok) throw new Error('Chapters file not found');
  return response.json();
}