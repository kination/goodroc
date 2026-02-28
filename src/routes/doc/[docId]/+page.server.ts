import type { PageServerLoad } from './$types';
import fs from 'fs/promises';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
  const { docId } = params;

  try {
    const filePath = path.resolve('src/dummy-docs', `${docId}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    return {
      docId,
      content
    };
  } catch (err) {
    return {
      docId,
      content: `# 404 Not Found\nSorry, the document \`${docId}\` could not be found in the dummy directory.`
    };
  }
};
