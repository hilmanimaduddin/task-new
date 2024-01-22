const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { error } = require("console");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

async function getKabupatenList(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const kabupatenList = [];

    const table = $(".wikitable");

    if (table.length > 0) {
      const rows = table.find("tr").slice(1);
      rows.each((_, row) => {
        const columns = $(row).find("td");
        const kabupatenName = columns.eq(0).text().trim();
        kabupatenList.push(kabupatenName);
      });
    }

    console.log(kabupatenList);
    return kabupatenList;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

function saveToCsv(data, folder, filename) {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    const csvWriter = createCsvWriter({
      path: `${folder}/${filename}`,
      header: [{ id: "kabupaten", title: "Kabupaten" }],
    });

    csvWriter.writeRecords(data).then(() => {
      console.log(`Data berhasil disimpan ke ${folder}/${filename}`);
    });
  } catch (err) {
    console.log("Error saving to CSV:", err);
  }
}

(async () => {
  const wikipediaUrl =
    "https://id.wikipedia.org/wiki/Daftar_kabupaten_di_Indonesia";
  const kabupatenData = await getKabupatenList(wikipediaUrl);
  const date = new Date().toISOString().replace(/[-T:]/g, "").slice(0, -5);
  if (kabupatenData.length > 0) {
    const formattedData = kabupatenData.map((kabupaten) => ({
      kabupaten,
    }));

    saveToCsv(formattedData, "upload", `daftar_kabupaten_${date}.csv`);
  } else {
    console.log("Gagal mendapatkan data daftar kabupaten.");
  }
})();
