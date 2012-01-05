//
//   Copyright 2012 Wade Alcorn wade@bindshell.net
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
//
DecoderTab = function() {

	/*
	 * The panel used to encode/decode text.
	 ********************************************/
	var decoder_panel = new Ext.FormPanel({
		title: 'Decoder',
		id: 'decoder-panel',
		hideLabels : false,
		border: false,
		padding: '3px 5px 0 5px',

		items:[{
			fieldLabel: 'Text',
			xtype: 'textarea',
			id: 'inputText',
			name: 'inputText',
			width: '100%',
			height: '40%',
			allowBlank: true
		},{
			fieldLabel: 'Result',
			xtype: 'textarea',
			id: 'resultText',
			name: 'resultText',
			width: '100%',
			height: '40%',
			allowBlank: true
		}],

		buttons: [{
			text: 'Encode',
			handler: function() {
				var form = Ext.getCmp('decoder-panel').getForm();
				var form_values = form.getValues();
				var input_text = form_values['inputText'];
				var result="";
				switch (form_values['decodeType']) {
					case "base64":
					break;
					case "rot13":
						result = input_text.replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);});
					break;
					case "addslashes":
						result = input_text.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
					break;
					case "stripslashes":
						result = input_text.replace(/\\(.?)/g, function (s, n1) {switch (n1) {case '\\':return '\\';case '0':return '\u0000';case '':return '';default:return n1;}});
					break;
					case "reverse":
					break;
					case "escape":
						result = escape(input_text);
					break;
					case "unescape":
						result = unescape(input_text);
					break;
					case "encodeuri":
						result = encodeURI(input_text);
					break;
					case "decodeuri":
						result = decodeURI(input_text);
					break;
					default:
				}
				form.setValues({resultText: result});
			}
		},{
			text: 'Decode',
			handler: function() {
				var form = Ext.getCmp('decoder-panel').getForm();
				var form_values = form.getValues();
				var input_text = form_values['inputText'];
				var result="";
				switch (form_values['decodeType']) {
					case "base64":
					break;
					case "rot13":
						result = input_text.replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);});
					break;
					case "addslashes":
						result = input_text.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
					break;
					case "stripslashes":
						result = input_text.replace(/\\(.?)/g, function (s, n1) {switch (n1) {case '\\':return '\\';case '0':return '\u0000';case '':return '';default:return n1;}});
					break;
					case "reverse":
					break;
					case "escape":
						result = escape(input_text);
					break;
					case "unescape":
						result = unescape(input_text);
					break;
					case "encodeuri":
						result = encodeURI(input_text);
					break;
					case "decodeuri":
						result = decodeURI(input_text);
					break;
					default:
				}
				form.setValues({resultText: result});
			}
		}]

	});

	decode_combo = new Ext.form.ComboBox({
		name: 'decodeType',
		disableKeyFilter: false,
		fieldLabel: 'Type',
		forceSelection: true,
		emptyText: '--select--',
		triggerAction: 'all',
		mode: 'local',
		store: new Ext.data.SimpleStore({
			id: 0,
			fields: ['value', 'text'],
			data: [
				//['base64', 'Base64'],
				//['reverse', 'Reverse'],
				['rot13', 'Rot13'],
				//['fromcharcode', 'String.fromCharCode'],
				['addslashes', 'Add Slashes'],
				['stripslashes', 'Strip Slashes'],
				['escape', 'escape()'],
				['unescape', 'unescape()'],
				['encodeuri', 'encodeURI()'],
				['decodeuri', 'decodeURI()']
			]
		}),
		valueField: 'value',
		displayField: 'text',
		hiddenName: 'decodeType'
	});

	decoder_panel.add(decode_combo);

	DecoderTab.superclass.constructor.call(this, {
		region: 'center',
		items: [decoder_panel],
		autoScroll: true,
		border: false
	});

};

Ext.extend(DecoderTab,Ext.Panel, {}); 
