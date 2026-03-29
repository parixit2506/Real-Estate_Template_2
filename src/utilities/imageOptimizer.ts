/**
 * Optimizes Unsplash URLs by adjusting quality and width parameters.
 * @param url The original Unsplash URL
 * @param width Target width in pixels
 * @param quality Target quality (1-100)
 * @returns Optimized URL string
 */
export const optimizeUnsplashUrl = (url: string, width: number = 1200, quality: number = 75): string => {
    if (!url || !url.includes('unsplash.com')) return url;

    // Split to get base URL without parameters
    const baseUrl = url.split('?')[0];

    // Reconstruct with optimized parameters
    // auto=format: browser picks best format (e.g. webp)
    // fit=crop: crop to fill the dimensions
    return `${baseUrl}?q=${quality}&w=${width}&auto=format&fit=crop`;
};
