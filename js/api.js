class API {

    static async login(nis){

        try {
            const formData = new FormData();

            formData.append("action","login");

            formData.append("nis",nis);

            const response = await fetch(CONFIG.API_URL,{

                method:"POST",

                body:formData

            });

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            return await response.json();
        } catch (error) {
            console.error("API login error:", error);
            return { success: false, message: "Gagal terhubung ke server." };
        }

    }

    static async upload(data){

        try {
            const formData = new FormData();
            formData.append("action", data.action);
            formData.append("nis", data.nis);
            formData.append("nama", data.nama);
            formData.append("kelas", data.kelas);
            formData.append("tempat", data.tempat);
            formData.append("mimeType", data.mimeType);
            formData.append("base64", data.base64);

            const response = await fetch(
                CONFIG.API_URL,
                {
                    method: "POST",
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            return await response.json();
        } catch (error) {
            console.error("API upload error:", error);
            return { success: false, message: "Gagal mengupload data." };
        }

    }

    static async cek(nis){

        try {
            const response=await fetch(

                CONFIG.API_URL+

                "?action=cek&nis="+encodeURIComponent(nis)

            );

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            return await response.json();
        } catch (error) {
            console.error("API cek error:", error);
            return { success: false, message: "Gagal memuat status presensi.", sudah: false, jam: "" };
        }

    }


    static async riwayat(nis){

        try {
            const response=await fetch(

                CONFIG.API_URL+

                "?action=riwayat&nis="+encodeURIComponent(nis)

            );

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            return await response.json();
        } catch (error) {
            console.error("API riwayat error:", error);
            return { success: false, message: "Gagal memuat riwayat presensi.", data: [] };
        }

    }

}