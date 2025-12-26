export const isWpVersionSupported = (version, minVersion) => {
    if (!version) return true;
    const v1 = String(version).split('.');
    const v2 = String(minVersion).split('.');
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        const num1 = parseInt(v1[i] || 0, 10);
        const num2 = parseInt(v2[i] || 0, 10);
        if (num1 > num2) return true;
        if (num1 < num2) return false;
    }
    return true;
};
