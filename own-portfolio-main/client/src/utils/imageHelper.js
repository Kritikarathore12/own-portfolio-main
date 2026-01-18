
export const getImageUrl = (path) => {
    if (!path) return '';

    // If it's a data URL (base64), return as is
    if (path.startsWith('data:')) return path;

    // Get API URL from env, removing trailing slash if present
    const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    // 1. Handle existing "localhost" links in the database
    // If we are in production but the link says localhost, replace it with the prod API URL
    if (path.includes('localhost:5000')) {
        return path.replace('http://localhost:5000', API_URL).replace('http://localhost:5000', API_URL); // Handle potential double occurrence or http/https mismatch if needed
    }

    // 2. Handle relative paths (e.g., "/uploads/file.jpg")
    if (path.startsWith('/')) {
        return `${API_URL}${encodeURI(path)}`;
    }

    // 3. Handle absolute paths (e.g., "https://placehold.co/...")
    // If it's already an http/https link (and not localhost which we caught above), return as is
    if (path.startsWith('http')) {
        return path;
    }

    // Fallback: assume it's a relative path without leading slash
    return `${API_URL}/${path}`;
};
