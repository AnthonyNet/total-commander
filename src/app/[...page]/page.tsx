import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

async function getUsers() {
  try {
    const usersDirectory = path.join(process.cwd(), 'users');
    const userFiles = await fs.readdir(usersDirectory);

    const files = userFiles.map(async (user) => {
      const filePath = path.join(usersDirectory, user);
      const stats = await fs.stat(filePath);
      return {
        name: user,
        isDirectory: stats.isDirectory(),
      };
    });

    const fileInfo = await Promise.all(files);
    return fileInfo;
  } catch (error) {
    console.error('Error reading users directory:', error);
    return [];
  }
}

export default async function Page() {
  const users = await getUsers(); 

  return (
    <main className='flex flex-col justify-center items-center'>
      <h1 className='p-6'>Anthony 📉</h1>
      <ul>
        <Link href="#">[ .. ]</Link>
        {users.map((user, index) => (
          <li key={index}>
            {user.isDirectory ? (
              <Link href="#" role="img" aria-label="Folder">
                📁 {user.name}
              </Link>
            ) : (
              <Link href="#" role="img" aria-label="File">
                📄 {user.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
