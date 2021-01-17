$(".toolbar-display-btn").click(function() {
    $(this).closest("nav").toggleClass("nav-opened")
})

$(".toolbar").on("click", ".toolbar-btn", function() {
    window.location.href = '/scores'
})
$(".sport-btn").click(function() {
    var sport = $(this).attr('id')
    if (sport === 'sports_football') {
        window.location.href = '/scores/football'
    } else if (sport === 'sports_basketball') {
        window.location.href = '/scores/basketball'
    }
})