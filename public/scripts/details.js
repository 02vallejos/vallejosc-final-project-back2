// details.js

const showOption = async () => {
  const opt_admin = document.querySelector("#opt_admin");
  const productId = document.querySelector("#opt_admin").dataset.productId;
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = "/api/auth/online";
  try {
    let response = await fetch(url, opts);
    response = await response.json();

    if (response.response?.role === "ADMIN") {
      opt_admin.innerHTML = `<button class="btn btn-danger" id="deleteBtn" >
                                Eliminar producto de la DB
                            </button>`;
      document
        .querySelector("#deleteBtn")
        .addEventListener("click", async () => {
          const deleteOpts = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          const deleteUrl = `/api/products/${productId}`;
          let deleteResponse = await fetch(deleteUrl, deleteOpts);
          let deleteResponseJson = await deleteResponse.json();
          if (deleteResponse.ok) {
            alert(
              `🆗 Producto eliminado: ${deleteResponseJson.response.title}`
            );
            window.location.href = "/";
          } else {
            alert(`❌ Error al eliminar el producto`);
          }
        });
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

showOption();
