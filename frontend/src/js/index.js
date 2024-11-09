function displayResult(data) {
  console.log(data);
}

$(document).ready(() => {
  $("a").click((event) => {
    route(event);
  });

  const accessToken =
    "BQCkILuKPYZlUTauPeEqH0bZ6tf4nz-uOmrcPgUvKFdziuPfQ2LOV8wyi_SqBaXuSjz7lo8in5paWXS3Xdwx9TVuCF-igOQLcGhhQvc9PQdUJC8Jj-k";

  const search = "https://api.spotify.com/v1/search?type=album&limit=20&q=";
  $("#search-form").on("submit", (e) => {
    e.preventDefault();
    const q = $("#search-bar").val();
    if (q == undefined) return;

    let url = search + q;
    console.log(url);
    $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      headers: { Authorization: "Bearer " + accessToken },
    }).then((data) => {
      console.log(data);
      let albums = data.albums;
      console.log(albums);
      console.log(albums.items);

      $("#results").empty();
      const header = $("<tr>").append(
        $("<th>"),
        $("<th>").text("Album"),
        $("<th>").text("Artists"),
        $("<th>").text("Type"),
      );
      $("#results").append(header);

      $.each(albums.items, (_idx, album) => {
        const image = album.images.sort((a, b) => a.width - b.width)[0];
        const artist = album.artists[0];

        const row = $("<tr>").append(
          $("<td>").append(
            $("<img>")
              .attr("src", image.url)
              .attr("alt", album.name)
              .css("width", image.width + "px"),
          ),
          $("<td>").text(album.name),
          $("<td>").text(artist.name),
          $("<td>").text(album.type),
        );

        $("#results").append(row);
      });
    });
  });
});
