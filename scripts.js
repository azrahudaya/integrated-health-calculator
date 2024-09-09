document.addEventListener("DOMContentLoaded", () => {
  // Kalkulator Prediksi Kehamilan
  const pregnancyForm = document.querySelector("#pregnancy-form");
  pregnancyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const lmp = new Date(document.getElementById("lmp").value); // Tanggal HPHT
    const today = new Date();
    const gestationalAge = Math.floor(
      (today - lmp) / (1000 * 60 * 60 * 24 * 7)
    ); // Usia kehamilan dalam minggu
    const dueDate = new Date(lmp);
    dueDate.setDate(lmp.getDate() + 280); // Perkiraan tanggal lahir (40 minggu dari HPHT)

    let trimester = "";
    let trimesterInfo = "";
    let tips = "";
    let emoji = "✨"; // Default emoji

    if (gestationalAge <= 13) {
      trimester = "Trimester Pertama (0-13 Minggu)";
      trimesterInfo =
        "Selamat memasuki awal kehamilan! 🍼 Trimester pertama adalah waktu penting untuk perkembangan awal janin. Mulailah mengonsumsi asam folat dan vitamin prenatal lainnya, hindari konsumsi kafein berlebih, dan tetap terhidrasi.";
      tips =
        "🍽️ Makan dalam porsi kecil tapi sering untuk mengurangi mual, dan lakukan aktivitas ringan seperti berjalan kaki. 🚶‍♀️";
      emoji = "👶";
    } else if (gestationalAge <= 27) {
      trimester = "Trimester Kedua (14-27 Minggu)";
      trimesterInfo =
        "Anda berada di Trimester kedua! 🤰 Ini adalah saat kehamilan terasa lebih stabil. Mulai fokus pada pola makan sehat dan rutin melakukan latihan ringan untuk menjaga kesehatan tubuh.";
      tips =
        "🧘‍♀️ Mulailah melakukan latihan senam kehamilan atau yoga prenatal untuk memperkuat otot dan meningkatkan fleksibilitas. 💪";
      emoji = "🤱";
    } else if (gestationalAge <= 40) {
      trimester = "Trimester Ketiga (28-40 Minggu)";
      trimesterInfo =
        "Trimester ketiga sudah tiba! 🏁 Persiapkan mental dan fisik Anda menjelang kelahiran. Jaga asupan makanan kaya serat untuk mencegah sembelit dan tetap terhidrasi dengan baik.";
      tips =
        "🧘‍♂️ Pelajari teknik pernapasan dan relaksasi untuk persiapan persalinan, dan ajak pasangan untuk ikut serta. 👨‍👩‍👧";
      emoji = "🎉";
    } else {
      trimester = "Di luar perkiraan trimester";
      trimesterInfo =
        "Data usia kehamilan melebihi 40 minggu, harap periksa kembali input tanggal HPHT. 🧐";
      tips = "⚠️ Konsultasikan dengan dokter untuk informasi lebih lanjut. ⚕️";
      emoji = "⚠️";
    }

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dueDateString = dueDate.toLocaleDateString("id-ID", options);

    document.getElementById("pregnancy-result").innerHTML = `
      <div>Usia kehamilan Anda adalah <span class="font-bold text-blue-500">${gestationalAge} minggu</span>. ${emoji}</div>
      <div>Perkiraan tanggal persalinan Anda adalah <span class="font-bold text-blue-500">${dueDateString}</span>. ${emoji}</div>
      <div class="mt-4">
        <h3 class="text-xl font-bold text-indigo-600">${trimester}</h3>
        <p>${trimesterInfo}</p>
        <h4 class="text-lg font-bold mt-2 text-green-500">Tips:</h4>
        <p>${tips}</p>
      </div>
    `;
  });

  // Kalkulator IMT
  const bmiForm = document.querySelector("#trimester-form");
  const inputMethod = document.getElementById("input-method");
  const trimesterInput = document.getElementById("trimester-input");
  const lmpInput = document.getElementById("lmp-input");

  // Toggle input visibility based on input method selection
  inputMethod.addEventListener("change", (event) => {
    if (event.target.value === "trimester") {
      trimesterInput.style.display = "block";
      lmpInput.style.display = "none";
    } else if (event.target.value === "lmp") {
      trimesterInput.style.display = "none";
      lmpInput.style.display = "block";
    }
  });

  bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const preweight = parseFloat(document.getElementById("preweight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
    let trimester = "";
    const today = new Date();
    let gestationalAge = 0;

    if (inputMethod.value === "trimester") {
      trimester = document.getElementById("trimester").value;
    } else if (inputMethod.value === "lmp") {
      const lmpDate = new Date(document.getElementById("lmp-bmi").value);
      gestationalAge = Math.floor(
        (today - lmpDate) / (1000 * 60 * 60 * 24 * 7)
      );
      if (gestationalAge <= 13) {
        trimester = "1";
      } else if (gestationalAge <= 27) {
        trimester = "2";
      } else {
        trimester = "3";
      }
    }

    const bmi = (preweight / (height * height)).toFixed(2);
    let bmiCategory = "";
    let message = "";
    let bmiStatus = "";
    let emoji = "";

    if (bmi < 18.5) {
      bmiCategory = "underweight";
      bmiStatus = "<span class='text-yellow-500 font-bold'>Kurus</span>";
      emoji = "😟";

      // Detailed Recommendations for Kurus (Underweight)
      if (trimester === "1") {
        message = `
          Pada trimester pertama, penting bagi Anda untuk meningkatkan asupan kalori guna mendukung perkembangan janin. Konsumsi makanan kaya nutrisi. Jangan lupa minum air putih yang cukup agar tubuh tetap terhidrasi. ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Makan dalam porsi kecil tapi sering, dan tambahkan camilan bergizi di antara waktu makan utama seperti yogurt, kacang almond, atau smoothie buah segar. 🥑🍗
        `;
      } else if (trimester === "2") {
        message = `
          Pada trimester kedua, fokuskan pada penambahan berat badan yang stabil dengan mengonsumsi lebih banyak protein berkualitas. 🐟🥩 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Tambahkan lemak sehat seperti minyak zaitun atau mentega almond dalam makanan utama.
        `;
      } else {
        message = `
          Pada trimester ketiga, janin akan mengalami pertumbuhan pesat, sehingga kebutuhan kalori meningkat lagi. Perbanyak makanan kaya zat besi dan vitamin C untuk mencegah anemia. ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Camilan yang kaya nutrisi seperti selai kacang di atas roti gandum atau buah segar dengan yogurt sangat disarankan. 🥙
        `;
      }
    } else if (bmi < 24.9) {
      bmiCategory = "normal";
      bmiStatus = "<span class='text-green-500 font-bold'>Normal</span>";
      emoji = "😊";

      // Detailed Recommendations for Normal
      if (trimester === "1") {
        message = `
          Pada trimester pertama, penting untuk menjaga pola makan yang seimbang. Konsumsilah makanan dari berbagai kelompok makanan. 🥦🍎 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Pilih camilan sehat seperti buah-buahan, kacang-kacangan, dan biji-bijian.
        `;
      } else if (trimester === "2") {
        message = `
          Pada trimester kedua, tambahkan kalori ekstra dan fokus pada makanan kaya zat besi seperti daging tanpa lemak dan bayam. 💪🍖 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Lakukan senam hamil atau yoga prenatal untuk menjaga kebugaran tubuh.
        `;
      } else {
        message = `
          Pada trimester ketiga, jaga asupan makanan kaya serat untuk mencegah sembelit. Perbanyak konsumsi buah-buahan segar dan sayuran. 🌽🍇 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Camilan seperti sayuran segar dengan hummus atau roti gandum dengan alpukat sangat baik untuk menjaga pencernaan.
        `;
      }
    } else if (bmi < 29.9) {
      bmiCategory = "overweight";
      bmiStatus = "<span class='text-orange-500 font-bold'>Gemuk</span>";
      emoji = "😐";

      // Detailed Recommendations for Gemuk (Overweight)
      if (trimester === "1") {
        message = `
          Jika Anda berada dalam kategori gemuk, penting untuk menjaga kenaikan berat badan yang terkendali. Konsumsi makanan rendah lemak dan hindari makanan olahan. 🍉🥗 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Minum air putih yang cukup, dan pilih camilan sehat seperti buah segar atau sayuran kukus.
        `;
      } else if (trimester === "2") {
        message = `
          Pada trimester kedua, tetap fokus pada makanan rendah lemak dan kaya serat. Pilih protein rendah lemak seperti ikan dan tahu. 🐟🥒 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Aktivitas fisik seperti jalan kaki ringan atau berenang dapat membantu menjaga berat badan.
        `;
      } else {
        message = `
          Pada trimester ketiga, penting untuk mengontrol kenaikan berat badan. Fokus pada makanan tinggi serat dan protein tanpa lemak. 🍗🥦 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Lakukan aktivitas fisik ringan seperti yoga prenatal atau jalan kaki.
        `;
      }
    } else {
      bmiCategory = "obese";
      bmiStatus = "<span class='text-red-500 font-bold'>Obesitas</span>";
      emoji = "😟";

      // Detailed Recommendations for Obesitas (Obese)
      if (trimester === "1") {
        message = `
          Bagi ibu hamil dengan obesitas, penting untuk membatasi kenaikan berat badan pada trimester pertama. Fokuslah pada makanan rendah kalori tetapi tinggi nutrisi seperti sayuran hijau dan buah-buahan segar. 🥗🍇 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Tetap aktif dengan berjalan kaki dan minumlah air putih yang cukup.
        `;
      } else if (trimester === "2") {
        message = `
          Pada trimester kedua, tetap kendalikan kenaikan berat badan dengan fokus pada makanan rendah lemak dan tinggi serat. Pilih protein tanpa lemak seperti ayam tanpa kulit atau ikan. 🐟🥬 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Aktivitas fisik ringan seperti yoga prenatal dapat membantu menjaga berat badan.
        `;
      } else {
        message = `
          Pada trimester ketiga, kendalikan kenaikan berat badan dengan ketat. Pilih makanan rendah kalori tetapi tinggi nutrisi seperti sayuran hijau dan buah-buahan segar. 🥦🍇 ${emoji}
          <br><br><strong>Tips Tambahan:</strong> Lakukan olahraga ringan seperti jalan kaki atau senam hamil.
        `;
      }
    }

    // Display the result with emojis and color
    document.getElementById("bmi-result").innerHTML = `
      <div>
        <h3 class="text-xl font-bold text-indigo-600">Kategori IMT: ${bmiStatus}</h3>
        <p>${message}</p>
      </div>
    `;
  });
});
