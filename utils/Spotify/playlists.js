const newPlaylist = async(userId1, userId2, mood, name)  => {
    if(!userId2){
    await fetch (`https://api.spotify.com/v1/users/${userId1}/playlists`,{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            "name": `${name ? name : mood}`,
            "description": "New playlist description",
            "public": false
          },
    })
}

}