(function() {
  "use strict";

  /*
  * this file is only for documentation
  *
  * this file is here only to list the methods a client of dialog must implement
  *
  * this list is not complete. it must be fixed.
  *
  * this file is not included in the cairo ( no <script src= > in index.html )
  *
  * */

  Cairo.module("Dialogs.Views", function(Views, Cairo, Backbone, Marionette, $, _) {

    Views.DialogClient = {

      addEnabled: function() { /* TODO: implement this. */ },
      copyEnabled: function() { /* TODO: implement this. */ },
      columnAfterUpdate: function(propertyKey, rowIndex, columnIndex) { /* TODO: implement this. */ },
      columnAfterEdit: function(propertyKey, rowIndex, columnIndex, newValue, newId) { /* TODO: implement this. */ },
      columnBeforeEdit: function(propertyKey, rowIndex, columnIndex, keyAscii) { /* TODO: implement this. */ },
      columnButtonClick: function(propertyKey, rowIndex, columnIndex, keyAscii) { /* TODO: implement this. */ },
      deleteRow: function(propertyKey, row, rowIndex) { /* TODO: implement this. */ },
      discardChanges: function() { /* TODO: implement this. */ },
      editDocumentsEnabled: function() { /* TODO: implement this. */ },
      editNew: function() { /* TODO: implement this. */ },
      getDocumentId: function() { /* TODO: implement this. */ },
      getDocumentIsPrinted: function() { /* TODO: implement this. */ },
      isEmptyRow: function(propertyKey, row, rowIndex) { /* TODO: implement this. */ },
      isDocument: function() { /* TODO: implement this. */ },
      messageEx: function(messageKey, info) { /* TODO: implement this. */ },
      moveNext: function() { /* TODO: implement this. */ },
      moveBack: function() { /* TODO: implement this. */ },
      newRow: function(propertyKey, rowIndex) { /* TODO: implement this. */ },
      propertyChange: function() { /* TODO: implement this. */ },
      showDocDigital: function() { /* TODO: implement this. */ },
      validateRow: function(propertyKey, row, rowIndex) { /* TODO: implement this. */ }

    };

  });

}());