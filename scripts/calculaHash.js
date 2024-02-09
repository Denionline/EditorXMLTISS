function calculateHash(xml) {
    const hash = CryptoJS.SHA1(xml).toString();
    return hash;
}