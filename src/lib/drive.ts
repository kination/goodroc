export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  children?: DriveFile[]; // for nested folders
}

/**
 * Fetches all directories and markdown files inside a given Google Drive Folder ID.
 */
export async function fetchDriveHierarchy(folderId: string, accessToken: string): Promise<DriveFile[]> {
  // mimeType: Google Folder OR Markdown file
  // Filter out trashed files
  const query = `'${folderId}' in parents and trashed = false and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'text/markdown' or name contains '.md')`;

  const url = new URL('https://www.googleapis.com/drive/v3/files');
  url.searchParams.append('q', query);
  url.searchParams.append('fields', 'files(id, name, mimeType)');
  url.searchParams.append('orderBy', 'folder, name'); // Folders first, then alphabetical

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    let errMsg = `Google Drive API error: ${response.status}`;
    try {
      const errRes = await response.json();
      if (errRes.error?.message) {
        errMsg = errRes.error.message;
      }
    } catch (e) {
      console.error('Failed to parse error response', e);
    }
    console.error(errMsg);
    throw new Error(errMsg);
  }

  const data = await response.json();
  return data.files as DriveFile[];
}

/**
 * Fetches the raw content of a Google Drive file.
 */
export async function fetchFileContent(fileId: string, accessToken: string): Promise<string> {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch file content for ${fileId}:`, errorText);
    throw new Error(`Failed to fetch file content: ${response.status}`);
  }

  return await response.text();
}

