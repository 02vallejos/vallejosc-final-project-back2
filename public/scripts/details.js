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
      // inserto los botones
      opt_admin.innerHTML = `
                            <button class="btn btn-danger p-0 m-2" id="deleteBtn" >
                                Eliminar producto de la DB
                            </button>
                            <a class="btn btn-info p-0 m-2" id="updateBtn" >
                                Actulizar producto
                            </a>
                            `;
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
          deleteResponse = await deleteResponse.json();
          if (deleteResponse.error) {
            alert(`❌ Error al eliminar el producto`);
          } else {
            alert(
              `🆗 Producto eliminado: ${deleteResponseJson.response.title}`
            );
            window.location.href = "/";
          }
        });

      updateBtn = document.querySelector("#updateBtn");
      updateBtn.href = `/product/update-product/${productId}`;
    }

    // creacion del boton
    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "btn btn-info p-0 m-2";
    addToCartBtn.id = "addToCart";

    addToCartBtn.addEventListener("click", async () => {
      const addOpt = {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
      };

      addUrl = `/api/carts/${productId}`;
      const addResponse = await fetch(addUrl, addOpt);

      console.log(addResponse);

      if (addResponse.ok) {
        alert("Agregado al carrito");
        window.location.reload();
      } else {
        alert("Error al agregar al carrito");
        window.location.reload();
      }
    });

    // consulta por el producto si esta en carro
    let readOpt = {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    };
    readUrl = `/api/carts?product_id=${productId}&user_id=${response.response.id}`;
    // readUrl = `/api/carts?product_id=${productId}&user_id=185568c49c69ee746b4958f9`;
    let readResponse = await fetch(readUrl, readOpt);
    readResponse = await readResponse.json();

    // console.log("readResponse");
    // console.log(readResponse);

    if (readResponse.response) {
      if (
        !readResponse.response.product_id._id &&
        !readResponse.response.user_id._id
      ) {
        addToCartBtn.textContent = "Add to Cart";
        opt_admin.appendChild(addToCartBtn);
      } else {
        addToCartBtn.className = "btn btn-succes";
        addToCartBtn.textContent = "In the Cart";
        addToCartBtn.disabled = true;
        opt_admin.appendChild(addToCartBtn);
      }
    } else {
       addToCartBtn.textContent = "Add to Cart";
      opt_admin.appendChild(addToCartBtn);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

showOption();
