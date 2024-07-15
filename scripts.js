document.addEventListener("DOMContentLoaded", () => {
  // Kalkulator Kehamilan
  const pregnancyForm = document.querySelector("#pregnancy-calculator form");
  pregnancyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const lmp = new Date(document.getElementById("lmp").value);
    const today = new Date();
    const gestationalAge = Math.floor(
      (today - lmp) / (1000 * 60 * 60 * 24 * 7)
    );
    const dueDate = new Date(lmp);
    dueDate.setDate(lmp.getDate() + 280); // 40 minggu

    let gestationalStyle = "";
    let emoji = "✨";
    if (gestationalAge <= 12) {
      gestationalStyle = "text-green-500";
    } else if (gestationalAge <= 28) {
      gestationalStyle = "text-yellow-500";
    } else if (gestationalAge <= 36) {
      gestationalStyle = "text-orange-500";
    } else {
      gestationalStyle = "text-red-500";
    }

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dueDateString = dueDate.toLocaleDateString("id-ID", options);

    document.getElementById("pregnancy-result").innerHTML = `
      <div>Usia kehamilan Anda adalah <span class="${gestationalStyle} font-bold">${gestationalAge} minggu</span>. ${emoji}</div>
      <div>Perkiraan tanggal persalinan Anda adalah <span class="font-bold">${dueDateString}</span>. ${emoji}</div>
    `;
  });

  // Kalkulator IMT
  const bmiForm = document.querySelector("#bmi-calculator form");
  bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const height = parseFloat(document.getElementById("height").value) / 100;
    const weight = parseFloat(document.getElementById("weight").value);
    const bmi = (weight / (height * height)).toFixed(2);

    let bmiCategory = "";
    let bmiColor = "";
    let bmiEmoji = "";

    if (bmi < 18.5) {
      bmiCategory = "Kurus";
      bmiColor = "text-yellow-500";
      bmiEmoji = "😟";
    } else if (bmi < 24.9) {
      bmiCategory = "Normal";
      bmiColor = "text-green-500";
      bmiEmoji = "😊";
    } else if (bmi < 29.9) {
      bmiCategory = "Gemuk";
      bmiColor = "text-orange-500";
      bmiEmoji = "😐";
    } else {
      bmiCategory = "Obesitas";
      bmiColor = "text-red-500";
      bmiEmoji = "😟";
    }

    document.getElementById("bmi-result").innerHTML = `
      IMT Anda adalah <span class="${bmiColor} font-bold">${bmi}</span> (${bmiCategory}) ${bmiEmoji}.
    `;
  });

  // Kalkulator Kesehatan
  const healthForm = document.querySelector("#health-calculator form");
  healthForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const medicalHistory = document.getElementById("medical-history").value;

    let healthRisk = "";
    let healthColor = "";

    if (age < 18) {
      healthRisk = "Risiko rendah";
      healthColor = "text-green-500";
    } else if (age < 40) {
      healthRisk = "Risiko sedang";
      healthColor = "text-yellow-500";
    } else if (age < 60) {
      healthRisk = "Risiko tinggi";
      healthColor = "text-orange-500";
    } else {
      healthRisk = "Risiko sangat tinggi";
      healthColor = "text-red-500";
    }

    if (medicalHistory.toLowerCase().includes("penyakit kronis")) {
      healthRisk = "Risiko sangat tinggi";
      healthColor = "text-red-500";
    }

    document.getElementById("health-result").innerHTML = `
      Berdasarkan data yang Anda masukkan, risiko kesehatan Anda adalah <span class="${healthColor} font-bold">${healthRisk}</span>.
    `;
  });
});
