const ul = document.querySelector("ul");

ul.addEventListener("click", async (ev) => {
  if (ev.target.tagName === "LI") {
    const id = ev.target.getAttribute("er-id");
    console.log(id);
    await axios.delete(`/api/people/${id}`);
    init();
  }
});

const init = async () => {
  const response = await axios.get("/api/people");
  //console.log(response);
  const html = response.data
    .map((person) => {
      return `<li er-id="${person.id}">${person.name}</li>`;
    })
    .join("");
  ul.innerHTML = html;
};

init();
