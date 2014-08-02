Cairo.module("Select", function(Select, Cairo, Backbone, Marionette, $, _) {

  /*
      implements an auto complete control which shows a table grid
  */
  var createAutoCompleteControl = function() {
    $.widget('custom.cautocomplete', $.ui.autocomplete, {
        _renderMenu: function(ul, items) {
            var self = this;

            /*
                jQuery UI requires that "items" has to be an array of objects {label, value}
                and that is not what we want.

                we create items as an array of only one element with have an object with four
                properties {label, value, columns, rows}. the label and value properties aren't
                used.

            */

            // it is used in _renderItem
            this.options.columns = items[0].columns;

            if(items[0].rows.length === 0) {
              ul.append($('<div class="select-empty-result-message" style="width:100%">There isn&apos;t any rows using this filter: ' + this.element.text() + '</div>'));
            }
            else {
              if(this.options.showHeader) {
                  var table = $('<div class="ui-widget-header" style="width:100%"></div>');
                  var width = ul.width() === 0 ? this.element.width() : ul.width();
                  width = (width-50) / this.options.columns.length;
                  $.each(items[0].columns, function(index, item) {
                      table.append('<span style="padding:0 4px;float:left;width:' + width + 'px;">' +
                        item.name + '</span>');
                  });
                  table.append('<div style="clear: both;"></div>');
                  ul.append(table);
              }
              $.each(items[0].rows, function(index, item) {
                  self._renderItem(ul, item);
              });
            }
        },
        _renderItem: function(ul, item) {
            var t = '';
            var result = '';

            var width = ul.width() === 0 ? this.element.width() : ul.width();
            width = (width-50) / this.options.columns.length;
            $.each(this.options.columns, function(index, column) {
                t += '<span style="padding:0 4px;float:left;width:' + width + 'px;">' +
                      item.values[column.valueField ? column.valueField : index] + '</span>';
            });

            result = $('<li></li>').data('ui-autocomplete-item', { value: item.values[0], data: item }).append(
                          '<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>').appendTo(ul);
            return result;
        }
    });
  };

  createAutoCompleteControl();

  var createSelect = function() {

    var getSource = function(tableId, active, useSearch, internalFilter) {
      return "/system/select/rows" +
             "/" + tableId +
             "/{{filter}}" +
             "/" + active +
             "/" + useSearch +
             "/" + internalFilter +
             "/2"; // like: 1 filter% | 2 %filter% | 3 filter.replaceAll(*,%) | 4 %filter
    };

    var getValidateSource = function(tableId, active, internalFilter) {
      return "/system/select/validate" +
             "/" + tableId +
             "/{{text}}" +
             "/{{textId}}" +
             "/" + active +
             "/" + internalFilter;
    };

    var getSearchSource = function(tableId, active, internalFilter) {
      return getSource(tableId, active, true, internalFilter);
    };

    var getSelectSource = function(tableId, active, internalFilter) {
      return getSource(tableId, active, false, internalFilter);
    };

    /*
        @selector:  selector to an html input
        @source:    url to request the list
    */
    var createSelect = function(selector, source, validateSource) {
      var throttledRequest = _.debounce(function(request, responseCallBack) {
        var url = source.replace("{{filter}}", encodeURIComponent(request.term));
        $.ajax({
          url: url
          ,cache: false
          ,success: function(data) {
            /*
                jQuery UI requires that "items" has to be an array of objects {label, value}
                and that is not what we want.

                we create items as an array of only one element with have an object with four
                properties {label, value, columns, rows}. the label and value properties aren't
                used.

            */
            var items = [{
              label: "-",
              value: "-",
              columns: data.columns,
              rows: data.rows
            }];
            responseCallBack(items);
          }
        });
      }, 300);

      $(selector).cautocomplete({
        showHeader: true,
        source: function(request, responseCallBack) {
            return throttledRequest(request, responseCallBack);
        },
        select: function(event, ui) {
          if(ui.item) {
            this.value = ui.item.value;
            $(this).data("select-data", ui.item.data);
          }
          else {
            this.value = "";
            $(this).data("select-data", undefined);
          }
          return false;
        }
      });

      $(selector).blur(function() {
        var self = this;
        var textId = $(self).data("select-data");
        textId = textId || "-";
        var url = validateSource.replace(
                    "{{text}}",
                    encodeURIComponent(self.value)
                  ).replace(
                    "{{textId}}",
                    encodeURIComponent(textId)
                  );
        $.ajax({
          url: url
          ,cache: false
          ,success: function(data) {
            self.value = data.rows[0].values[0];
            $(self).data("select-data", data.rows[0].id);
          }
        });
      });

    };

    /*
        @selector:        selector to an html input
        @tableId:         tbl_id
        @active:          if the list must be filter using the active column
        @internalFilter:  allows to define flags for especial cases
    */
    var createSelectControl = function(selector, tableId, active, internalFilter) {
      createSelect(
        selector,
        getSelectSource(tableId, active, internalFilter),
        getValidateSource(tableId, active, internalFilter)
      );
    };

    return { createSelectControl: createSelectControl	};

  };

  Select.Controller = createSelect();
});