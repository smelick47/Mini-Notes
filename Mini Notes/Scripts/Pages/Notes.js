

function notesReady() {

    var qry = '<View><Query><OrderBy><FieldRef Name="ID"/></OrderBy><Where><Eq><FieldRef Name="Author"/><Value Type="Integer"><UserID Type="Integer"/></Value></Eq></Where></Query><RowLimit>10</RowLimit></View>';
    var items = getItemsFromList("Notes", qry, 'Include(Title,Type,ID)');

    var listInfoText = '';

    context.executeQueryAsync(
        function () {
            var listEnumerator = items.getEnumerator();

            while (listEnumerator.moveNext()) {

                var oim = listEnumerator.get_current();

                listInfoText += '<div class="pin pin' + oim.get_item('Type') + '" title="' + oim.get_item('Title') + '"></div>';
            }
            
            if (listInfoText == '') {
                $('div#pinContainer').append("<div class='pinEmpty'>You have no notes.</div>");
            }
            else {
                $('div#pinContainer').append(listInfoText);
            }
            

            //$('div.pin').tooltip({
            //    track: false,
            //    delay: 0,
            //    showURL: false,
            //    opacity: 1,
            //    showBody: " - ",
            //    top: 1
            //});

        },
        function (sender, args) {
            //alert("error in inner request: " + args.get_message());
            listInfoText += 'Sorry! Something wrong. Please try again.';
            $('div#pinContainer').append(listInfoText);
        }
   );


}