function fetchImageCollection() {
    const url = "https://api.themoviedb.org/3/movie/438631/images";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGVhMzgzMzljYjVlZDk1OGQzYTI1MjlkMDJjMGQ1YSIsIm5iZiI6MTc3MDMxODIyMi4yMiwic3ViIjoiNjk4NGU5OGVkOGMzODFhMjM4OWQxYzI0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QVkAaHCFetoPBhJqw2NNLc1nCijW-dUkV5RYEsC6_cE",
        },
    };

    return fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

function fetchConfig() {
    const url = "https://api.themoviedb.org/3/configuration";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGVhMzgzMzljYjVlZDk1OGQzYTI1MjlkMDJjMGQ1YSIsIm5iZiI6MTc3MDMxODIyMi4yMiwic3ViIjoiNjk4NGU5OGVkOGMzODFhMjM4OWQxYzI0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.QVkAaHCFetoPBhJqw2NNLc1nCijW-dUkV5RYEsC6_cE",
        },
    };

    return fetch(url, options)
        .then((res) => res.json())
        .catch((err) => console.error(err));
}

export default async function fetchImages(totalCards) {
    const config = await fetchConfig();
    const baseUrl = config.images.base_url;
    const posterSize = config.images.poster_sizes[2]; // set to the third lowest available size
    const prefixUrl = baseUrl + posterSize;

    const collection = await fetchImageCollection();
    let imageUrls = [];
    let i;
    for (i = 0; i < totalCards; i++) {
        imageUrls.push(prefixUrl + collection.posters[i].file_path);
    }

    return { urls: imageUrls, maxNum: collection.posters.length };
}
