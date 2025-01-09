export function validateStoreName(storeName: string) {
    // Validasi nama store (contoh: tidak boleh mengandung karakter khusus)
    const regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(storeName);
  }