let bm = new Bookmarker("bookmarker1")

function generateHTML()
{
    bms = bm.bookmarkers
    code = "<h2>Bookmarker</h2><hr>"

    for (let i = 0; i < bms.length; i++)
    {
        bookmark = bms[i]
        bookmarkCode = "<div class=" + '"bookmark"><div class="row">'

        bookmarkCode += '<div class="col-sm-10">'
        bookmarkCode += '<a href="#" onclick='+"'"+ 'open_link("'+bookmark.url+'")'+"'"+' class="primary">'
        bookmarkCode += '<h5 class="bookmark_name">' + bookmark.name + "</h5></a>"
        bookmarkCode += '<h5 class="bookmark_url">' + bookmark.url + "</h5></div>"
        
        bookmarkCode += '<div class="col-sm-2">'
        bookmarkCode += '<p><a href="#" onclick='+"'"+'delete_bookmark("'+bookmark.name+'", "'+bookmark.url+'") '+"'"+' class="delete">Delete</a></p></div></div><hr></div>'
        
        code += bookmarkCode

    }

    return code
}

function setHTML(html_)
{
    document.getElementById("bookmark_spot").innerHTML = html_
    bm.saveLocalData()
}

function open_link(link)
{
    bm.openURL(link)
}

function delete_bookmark(name, url)
{
    bm.removeBookmark(name, url)
    setHTML(generateHTML())
}

function add_new_bookmark()
{
    name = document.getElementById("newBookmarkName").value
    url = document.getElementById("newBookmarkURL").value

    if (name == null || url == null)
        return
    
    bm.addBookmark(name, url)
    setHTML(generateHTML())
}

function main()
{
    bm.loadLocalData()
    setHTML(generateHTML())
}