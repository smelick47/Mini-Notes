var context;
var web;
var user;

// This function is executed after the DOM is ready and SharePoint scripts are loaded
// Place any code you want to run when Default.aspx is loaded in this function
// The code creates a context object which is needed to use the SharePoint object model
function sharePointReady() {
    context = new SP.ClientContext.get_current();
    web = context.get_web();
    //getUserName();
}

function defaultReady() {
    var qry = '<View><Query><OrderBy><FieldRef Name="ID"/></OrderBy><Where><Eq><FieldRef Name="Author"/><Value Type="Integer"><UserID Type="Integer"/></Value></Eq></Where></Query></View>';
    var items = getItemsFromList("Notes", qry, 'Include(Title,Type,ID)');

    var listInfoText = '';

    context.executeQueryAsync(
        function () {
            var listEnumerator = items.getEnumerator();
            var i = 0;
            while (listEnumerator.moveNext()) {
                i++;
                listInfoText += getlisttag(listEnumerator.get_current());
            }
            $('ul.mininotes').append(listInfoText);
        },
        function (sender, args) {
            //alert("error in inner request: " + args.get_message());
            listInfoText += '<li>Sorry! Something wrong. Please try again.</li>';
            $('ul.mininotes').append(listInfoText);
        }
   );
}

// This function prepares, loads, and then executes a SharePoint query to get the current users information
function getUserName() {
    user = web.get_currentUser();
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// This function is executed if the above OM call is successful
// It replaces the content of the 'welcome' element with the user name
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
}

// This function is executed if the above OM call fails
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}

function redirectTo(sPage, iItemId) {
    var sUrl = "";
    switch (sPage) {
        case "NewItem":
            sUrl = "../Lists/Notes/NewForm.aspx?Source=" + window.location.href;
            break;
        case "EditItem":
            if (iItemId) {
                sUrl = "../Lists/Anniversaries/EditForm.aspx?ID=" + iItemId + "&Source=" + window.location.href;
            }
            break;
        case "UserImageLibrary":
            sUrl = "../Lists/UserImageLibrary/Forms/AllItems.aspx?Source=" + window.location.href;
            break;
        case "Anniversaries":
            sUrl = "../Lists/Anniversaries/AnniversaryView.aspx?Source=" + window.location.href;
            break;
    }
    if (sUrl) {
        window.location.href = sUrl;
    }
}

function getQueryStringParameter(paramToRetrieve) {
    var params =
        document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}


// -- App --


//function getItemsFromView(listTitle, viewTitle) {

//    var list = web.get_lists().getByTitle(listTitle);
//    var view = list.get_views().getByTitle(viewTitle);
//    context.load(view);

//    context.executeQueryAsync(
//        function () {
//            getItemsFromList(listTitle, "<View><Query>" + view.get_viewQuery() + "</Query></View>");
//        },
//        function (sender, args) { alert("error: " + args.get_message()); }
//    );
//}

function deleteListItem(name,id) {
    
    var oList = web.get_lists().getByTitle(name);
    this.oListItem = oList.getItemById(id).deleteObject();
    context.executeQueryAsync();
}

function getItemsFromList(listTitle, queryText,fieldsFilter) {

    var list = web.get_lists().getByTitle(listTitle);
    var query = new SP.CamlQuery();
    query.set_viewXml(queryText);
    var items = list.getItems(query);
    context.load(items, fieldsFilter);

    return items;
}


function getlisttag(oList) {
    return '<li><a onclick="mininotesclick(this);" Title="Click to delete" href="#" data-id="' + oList.get_item('ID') + '" data-type="' + oList.get_item('Type') + '"><p>' + oList.get_item('Title') + '</p></a></li>';
}

// -- Default.aspx events-----

function mininotesclick(sender) {
    var id = $(sender).attr("data-id");
    deleteListItem("Notes", id);
    $(sender).remove();
}

//----------------------

// End app
