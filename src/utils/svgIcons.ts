const clockSvg = ({size, color}: {size?: string | number, color?: string}) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size ?? 24}" height="${size ?? 24}" viewBox="0 0 24 24" fill="none" stroke="${color ?? '#000000'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;

const flagSvg = ({size, color}: {size?: string | number, color?: string}) => `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${color ?? '#000000'}" height="${size ?? 24}" width="${size ?? 24}" class="w-6 h-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
</svg>
`;

export {clockSvg, flagSvg};