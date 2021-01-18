$(".toolbar-display-btn").click(function() {
    $(this).closest("nav").toggleClass("nav-opened")
})

$(".toolbar").on("click", ".toolbar-btn", function() {
    window.location.href = '/' + $(this).attr('id')
})
$(".sport-btn").click(function() {
    var sport = $(this).attr('id')
    if (sport === 'sports_football') {
        window.location.href = '/scores/football'
    } else if (sport === 'sports_basketball') {
        window.location.href = '/scores/basketball'
    } else if (sport === 'sports_favorites') {
        window.location.href = '/scores/favorites'
    }
})
$(".league-btn").click(function() {
    var league = $(this).attr('id')
    if (league === 'football_nfl') {
        window.location.href = '/scores/nfl'
    } else if (league === 'football_ncaaf') {
        window.location.href = '/scores/ncaaf'
    } else if (league === 'basketball_nba') {
        window.location.href = '/scores/nba'
    } else if (league === 'basketball_ncaab') {
        window.location.href = '/scores/ncaab'
    }
})