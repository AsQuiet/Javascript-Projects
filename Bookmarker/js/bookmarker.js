

function Bookmarker(name)
{
    this.name = name // the name of the data in localstorage
    this.bookmarkers = []
}

Bookmarker.prototype.formatBookmarkData = function(name, url)
{
    return {name:name, url : url}
}

Bookmarker.prototype.loadLocalData = function()
{
    let data = localStorage.getItem(this.name)

    if (data != null)
        this.bookmarkers = JSON.parse(data)
    else
        this.bookmarkers = []
}

Bookmarker.prototype.saveLocalData = function()
{
    localStorage.setItem(this.name, JSON.stringify(this.bookmarkers))
}

Bookmarker.prototype.addBookmark = function(name, url)
{
    this.bookmarkers.push(this.formatBookmarkData(name, url))
}

Bookmarker.prototype.removeBookmark = function(name, url)
{
    for (let i = 0; i < this.bookmarkers.length; i++)
    {
        if (this.bookmarkers[i].name == name && (this.bookmarkers[i].url == url || url == false))
        {
            this.bookmarkers.splice(i, 1)
            break
        }
            
    }
}

Bookmarker.prototype.openURL = function(url)
{
    window.open(url, "_blank")
}

