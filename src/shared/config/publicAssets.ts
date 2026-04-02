export const publicAssetSourceDir = '_private/_private_fileAssets/v1/public' as const;
export const legacyPublicAssetSourceDir = '_private/_private_fileAssets/public' as const;

export const faviconFileName = 'vite.ico' as const;

export const pwaIconDescriptors = [
  { src: 'icons/180.png', sizes: '180x180', type: 'image/png' },
  { src: 'icons/192.png', sizes: '192x192', type: 'image/png' },
  { src: 'icons/512.png', sizes: '512x512', type: 'image/png' }
] as const;

export const pwaIconFileNames = pwaIconDescriptors.map((icon) => icon.src);
export const publicAssetFileNames = [faviconFileName, ...pwaIconFileNames] as const;
