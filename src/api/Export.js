import qs from "qs";
// 发送 post 请求
const url = "/qtoolsOms/items/exportItmes";
export function ExportApi(data) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: qs.stringify(data)
  }).then(res => {
    res.blob().then(blob => {
      var filename = res.headers.get("Content-Disposition");
      const index = filename.search(/filename=/);
      const filenames = filename.substring(index + 9, filename.length);
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filenames;
      a.click();
      a.remove();
    });
  });
}
