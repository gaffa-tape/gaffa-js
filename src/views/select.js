/******************************************select******************************************/

//    Properties:
//        styles: container | container-fluid | row | row-fluid | span* | offset*
(function(undefined) {
    var viewType = "select",
        cachedElement;
    
    window.gaffa.views = window.gaffa.views || {};
    window.gaffa.views[viewType] = window.gaffa.views[viewType] || newView();
    
    function createElement(viewModel) {
        var classes = viewType;
        
        var renderedElement = cachedElement || (cachedElement = document.createElement('select'));
        
        renderedElement = $(renderedElement.cloneNode(true)).addClass(classes)[0];
        
        $(renderedElement).bind(viewModel.updateEventName || "change", function(){
            window.gaffa.model.set(viewModel.properties.value.binding, $(this).val(), viewModel);    
        });
        
        viewModel.viewContainers.list.element = renderedElement;
        
        return renderedElement;
    }

    function newView() {
        
        function view() {
        }    
        
        view.prototype = {
            update: {             
                options: function(viewModel, firstRun) {
                    var value = viewModel.properties.options.value,
                        optionsObj = viewModel.properties.options,
                        element = $(viewModel.renderedElement);
                        
                    if(!Array.isArray(value)){
                        value = [];
                    }
                    
                    if(element){
                        element.empty();                            
                        element.append($(document.createElement("option")).val(""));
                        for(var i = 0; i < value.length; i ++){
                            var optionData = value[i];
                            if(optionData !== undefined){
                                var option = document.createElement('option');
                                
                                option.value = gaffa.utils.getProp(value, i + gaffa.pathSeparator +  optionsObj.valuePath);
                                option.innerHTML = gaffa.utils.getProp(value, i + gaffa.pathSeparator +  optionsObj.textPath);

                                element.append(option);
                            }
                        }
                    }
                },
                value: function(viewModel, firstRun) {
                    var value = viewModel.properties.value.value,
                        element = $(viewModel.renderedElement);
                    if(element){
                        if(value === null || value === undefined || value === ""){
                            element.val("");
                        }else{
                            element.val(value);
                        }
                    }                                      
                }
            },
            defaults: {
                viewContainers:{
                    list: []
                },
                properties: {
                    value: {},
                    options: {},            
                    optionText: {},
                    optionValue: {}
                }
            }
        };
        
        $.extend(true, view.prototype, window.gaffa.views.base(viewType, createElement), view.prototype);
                
        return new view();
    }
    
})();