{
  let globalNav = `
    <nav class = "r3-global-side-nav" id="ar3-global-side-nav">
      <button href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</button>
      <a href="https://google.com" target="_blank">google</a>
      <a href="https://yahoo.com" target="_blank">test</a>
      <a href="https://github.com" target="_blank">github</a>
    </nav>

    <button onclick="openNav()">open</button>
  `;
  $(".r3-global-nav").html("This is global nav" + globalNav);

  /* Set the width of the side navigation to 250px */
  function openNav() {
    document.getElementById("ar3-global-side-nav").style.width = "250px";
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("ar3-global-side-nav").style.width = "0";
  }

}
