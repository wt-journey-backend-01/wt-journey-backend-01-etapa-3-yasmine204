function normalizeText (q) {
    const term = q
        .replace(/['"]/g, '')
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    
    return term;
}

module.exports = normalizeText;