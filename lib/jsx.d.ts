declare namespace JSX {
	/* html jsx */
	export type Child = string | number | boolean | null | undefined | unknown;
	export type Children = Child | Child[];

	interface IntrinsicAttributes {
		slot?: string;
		children?: Children;
		
		'use:hydrate'?: boolean|string;
	}

	// All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
	interface AriaAttributes {
		/** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
		'aria-activedescendant'?: string | undefined | null;
		/** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
		'aria-atomic'?: boolean | 'false' | 'true' | undefined | null;
		/**
		 * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
		 * presented if they are made.
		 */
		'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined | null;
		/** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
		'aria-busy'?: boolean | 'false' | 'true' | undefined | null;
		/**
		 * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
		 * @see aria-pressed @see aria-selected.
		 */
		'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined | null;
		/**
		 * Defines the total number of columns in a table, grid, or treegrid.
		 * @see aria-colindex.
		 */
		'aria-colcount'?: number | undefined | null;
		/**
		 * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
		 * @see aria-colcount @see aria-colspan.
		 */
		'aria-colindex'?: number | undefined | null;
		/**
		 * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
		 * @see aria-colindex @see aria-rowspan.
		 */
		'aria-colspan'?: number | undefined | null;
		/**
		 * Identifies the element (or elements) whose contents or presence are controlled by the current element.
		 * @see aria-owns.
		 */
		'aria-controls'?: string | undefined | null;
		/** Indicates the element that represents the current item within a container or set of related elements. */
		'aria-current'?:
			| boolean
			| 'false'
			| 'true'
			| 'page'
			| 'step'
			| 'location'
			| 'date'
			| 'time'
			| undefined
			| null;
		/**
		 * Identifies the element (or elements) that describes the object.
		 * @see aria-labelledby
		 */
		'aria-describedby'?: string | undefined | null;
		/**
		 * Identifies the element that provides a detailed, extended description for the object.
		 * @see aria-describedby.
		 */
		'aria-details'?: string | undefined | null;
		/**
		 * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
		 * @see aria-hidden @see aria-readonly.
		 */
		'aria-disabled'?: boolean | 'false' | 'true' | undefined | null;
		/**
		 * Indicates what functions can be performed when a dragged object is released on the drop target.
		 * @deprecated in ARIA 1.1
		 */
		'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined | null;
		/**
		 * Identifies the element that provides an error message for the object.
		 * @see aria-invalid @see aria-describedby.
		 */
		'aria-errormessage'?: string | undefined | null;
		/** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
		'aria-expanded'?: boolean | 'false' | 'true' | undefined | null;
		/**
		 * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
		 * allows assistive technology to override the general default of reading in document source order.
		 */
		'aria-flowto'?: string | undefined | null;
		/**
		 * Indicates an element's "grabbed" state in a drag-and-drop operation.
		 * @deprecated in ARIA 1.1
		 */
		'aria-grabbed'?: boolean | 'false' | 'true' | undefined | null;
		/** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
		'aria-haspopup'?:
			| boolean
			| 'false'
			| 'true'
			| 'menu'
			| 'listbox'
			| 'tree'
			| 'grid'
			| 'dialog'
			| undefined
			| null;
		/**
		 * Indicates whether the element is exposed to an accessibility API.
		 * @see aria-disabled.
		 */
		'aria-hidden'?: boolean | 'false' | 'true' | undefined | null;
		/**
		 * Indicates the entered value does not conform to the format expected by the application.
		 * @see aria-errormessage.
		 */
		'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined | null;
		/** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
		'aria-keyshortcuts'?: string | undefined | null;
		/**
		 * Defines a string value that labels the current element.
		 * @see aria-labelledby.
		 */
		'aria-label'?: string | undefined | null;
		/**
		 * Identifies the element (or elements) that labels the current element.
		 * @see aria-describedby.
		 */
		'aria-labelledby'?: string | undefined | null;
		/** Defines the hierarchical level of an element within a structure. */
		'aria-level'?: number | undefined | null;
		/** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
		'aria-live'?: 'off' | 'assertive' | 'polite' | undefined | null;
		/** Indicates whether an element is modal when displayed. */
		'aria-modal'?: boolean | 'false' | 'true' | undefined | null;
		/** Indicates whether a text box accepts multiple lines of input or only a single line. */
		'aria-multiline'?: boolean | 'false' | 'true' | undefined | null;
		/** Indicates that the user may select more than one item from the current selectable descendants. */
		'aria-multiselectable'?: boolean | 'false' | 'true' | undefined | null;
		/** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
		'aria-orientation'?: 'horizontal' | 'vertical' | undefined | null;
		/**
		 * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
		 * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
		 * @see aria-controls.
		 */
		'aria-owns'?: string | undefined | null;
		/**
		 * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
		 * A hint could be a sample value or a brief description of the expected format.
		 */
		'aria-placeholder'?: string | undefined | null;
		/**
		 * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
		 * @see aria-setsize.
		 */
		'aria-posinset'?: number | undefined | null;
		/**
		 * Indicates the current "pressed" state of toggle buttons.
		 * @see aria-checked @see aria-selected.
		 */
		'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined | null;
		/**
		 * Indicates that the element is not editable, but is otherwise operable.
		 * @see aria-disabled.
		 */
		'aria-readonly'?: boolean | 'false' | 'true' | undefined | null;
		/**
		 * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
		 * @see aria-atomic.
		 */
		'aria-relevant'?:
			| 'additions'
			| 'additions removals'
			| 'additions text'
			| 'all'
			| 'removals'
			| 'removals additions'
			| 'removals text'
			| 'text'
			| 'text additions'
			| 'text removals'
			| undefined
			| null;
		/** Indicates that user input is required on the element before a form may be submitted. */
		'aria-required'?: boolean | 'false' | 'true' | undefined | null;
		/** Defines a human-readable, author-localized description for the role of an element. */
		'aria-roledescription'?: string | undefined | null;
		/**
		 * Defines the total number of rows in a table, grid, or treegrid.
		 * @see aria-rowindex.
		 */
		'aria-rowcount'?: number | undefined | null;
		/**
		 * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
		 * @see aria-rowcount @see aria-rowspan.
		 */
		'aria-rowindex'?: number | undefined | null;
		/**
		 * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
		 * @see aria-rowindex @see aria-colspan.
		 */
		'aria-rowspan'?: number | undefined | null;
		/**
		 * Indicates the current "selected" state of various widgets.
		 * @see aria-checked @see aria-pressed.
		 */
		'aria-selected'?: boolean | 'false' | 'true' | undefined | null;
		/**
		 * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
		 * @see aria-posinset.
		 */
		'aria-setsize'?: number | undefined | null;
		/** Indicates if items in a table or grid are sorted in ascending or descending order. */
		'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined | null;
		/** Defines the maximum allowed value for a range widget. */
		'aria-valuemax'?: number | undefined | null;
		/** Defines the minimum allowed value for a range widget. */
		'aria-valuemin'?: number | undefined | null;
		/**
		 * Defines the current value for a range widget.
		 * @see aria-valuetext.
		 */
		'aria-valuenow'?: number | undefined | null;
		/** Defines the human readable text alternative of aria-valuenow for a range widget. */
		'aria-valuetext'?: string | undefined | null;
	}

	interface HTMLAttributes<T extends EventTarget> extends AriaAttributes {
		// Standard HTML Attributes
		class?: string | undefined | null;
		dataset?: object | undefined | null; // eslint-disable-line
		accept?: string | undefined | null;
		acceptcharset?: string | undefined | null;
		accesskey?: string | undefined | null;
		action?: string | undefined | null;
		allow?: string | undefined | null;
		allowfullscreen?: boolean | undefined | null;
		allowtransparency?: boolean | undefined | null;
		allowpaymentrequest?: boolean | undefined | null;
		alt?: string | undefined | null;
		as?: string | undefined | null;
		async?: boolean | undefined | null;
		autocomplete?: string | undefined | null;
		autofocus?: boolean | undefined | null;
		autoplay?: boolean | undefined | null;
		capture?: 'environment' | 'user' | boolean | undefined | null;
		cellpadding?: number | string | undefined | null;
		cellspacing?: number | string | undefined | null;
		charset?: string | undefined | null;
		challenge?: string | undefined | null;
		checked?: boolean | undefined | null;
		cite?: string | undefined | null;
		classid?: string | undefined | null;
		cols?: number | undefined | null;
		colspan?: number | undefined | null;
		content?: string | URL | undefined | null;
		contenteditable?: 'true' | 'false' | boolean | undefined | null;
		contextmenu?: string | undefined | null;
		controls?: boolean | undefined | null;
		coords?: string | undefined | null;
		crossorigin?: string | boolean | undefined | null;
		currenttime?: number | undefined | null;
		decoding?: 'async' | 'sync' | 'auto' | undefined | null;
		data?: string | undefined | null;
		datetime?: string | undefined | null;
		default?: boolean | undefined | null;
		defaultmuted?: boolean | undefined | null;
		defaultplaybackrate?: number | undefined | null;
		defer?: boolean | undefined | null;
		dir?: string | undefined | null;
		dirname?: string | undefined | null;
		disabled?: boolean | undefined | null;
		download?: any | undefined | null;
		draggable?: boolean | 'true' | 'false' | undefined | null;
		enctype?: string | undefined | null;
		enterkeyhint?:
			| 'enter'
			| 'done'
			| 'go'
			| 'next'
			| 'previous'
			| 'search'
			| 'send'
			| undefined
			| null;
		for?: string | undefined | null;
		form?: string | undefined | null;
		formaction?: string | undefined | null;
		formenctype?: string | undefined | null;
		formmethod?: string | undefined | null;
		formnovalidate?: boolean | undefined | null;
		formtarget?: string | undefined | null;
		frameborder?: number | string | undefined | null;
		headers?: string | undefined | null;
		height?: number | string | undefined | null;
		hidden?: boolean | undefined | null;
		high?: number | undefined | null;
		href?: string | URL | undefined | null;
		hreflang?: string | undefined | null;
		htmlfor?: string | undefined | null;
		httpequiv?: string | undefined | null;
		id?: string | undefined | null;
		inputmode?: string | undefined | null;
		integrity?: string | undefined | null;
		is?: string | undefined | null;
		ismap?: boolean | undefined | null;
		keyparams?: string | undefined | null;
		keytype?: string | undefined | null;
		kind?: string | undefined | null;
		label?: string | undefined | null;
		lang?: string | undefined | null;
		list?: string | undefined | null;
		loading?: string | undefined | null;
		loop?: boolean | undefined | null;
		low?: number | undefined | null;
		manifest?: string | undefined | null;
		marginheight?: number | undefined | null;
		marginwidth?: number | undefined | null;
		max?: number | string | undefined | null;
		maxlength?: number | undefined | null;
		media?: string | undefined | null;
		mediagroup?: string | undefined | null;
		method?: string | undefined | null;
		min?: number | string | undefined | null;
		minlength?: number | undefined | null;
		multiple?: boolean | undefined | null;
		muted?: boolean | undefined | null;
		name?: string | undefined | null;
		nonce?: string | undefined | null;
		novalidate?: boolean | undefined | null;
		open?: boolean | undefined | null;
		optimum?: number | undefined | null;
		part?: string | undefined | null;
		pattern?: string | undefined | null;
		placeholder?: string | undefined | null;
		playsinline?: boolean | undefined | null;
		poster?: string | undefined | null;
		preload?: string | undefined | null;
		radiogroup?: string | undefined | null;
		readonly?: boolean | undefined | null;
		referrerpolicy?: string | undefined | null;
		rel?: string | undefined | null;
		required?: boolean | undefined | null;
		reversed?: boolean | undefined | null;
		role?: string | undefined | null;
		rows?: number | undefined | null;
		rowspan?: number | undefined | null;
		sandbox?: string | undefined | null;
		scope?: string | undefined | null;
		scoped?: boolean | undefined | null;
		scrolling?: string | undefined | null;
		seamless?: boolean | undefined | null;
		selected?: boolean | undefined | null;
		shape?: string | undefined | null;
		size?: number | undefined | null;
		sizes?: string | undefined | null;
		slot?: string | undefined | null;
		span?: number | undefined | null;
		spellcheck?: boolean | 'true' | 'false' | undefined | null;
		src?: string | undefined | null;
		srcdoc?: string | undefined | null;
		srclang?: string | undefined | null;
		srcset?: string | undefined | null;
		start?: number | undefined | null;
		step?: number | string | undefined | null;
		style?: string | undefined | null;
		summary?: string | undefined | null;
		tabindex?: number | undefined | null;
		target?: string | undefined | null;
		title?: string | undefined | null;
		translate?: 'yes' | 'no' | '' | undefined | null;
		type?: string | undefined | null;
		usemap?: string | undefined | null;
		value?: any | undefined | null;
		/**
		 * a value between 0 and 1
		 */
		volume?: number | undefined | null;
		width?: number | string | undefined | null;
		wmode?: string | undefined | null;
		wrap?: string | undefined | null;

		// RDFa Attributes
		about?: string | undefined | null;
		datatype?: string | undefined | null;
		inlist?: any | undefined | null;
		prefix?: string | undefined | null;
		property?: string | undefined | null;
		resource?: string | undefined | null;
		typeof?: string | undefined | null;
		vocab?: string | undefined | null;

		// Non-standard Attributes
		autocapitalize?: string | undefined | null;
		autocorrect?: string | undefined | null;
		autosave?: string | undefined | null;
		color?: string | undefined | null;
		controlslist?: 'nodownload' | 'nofullscreen' | 'noplaybackrate' | 'noremoteplayback';
		itemprop?: string | undefined | null;
		itemscope?: boolean | undefined | null;
		itemtype?: string | undefined | null;
		itemid?: string | undefined | null;
		itemref?: string | undefined | null;
		results?: number | undefined | null;
		security?: string | undefined | null;
		unselectable?: boolean | undefined | null;
	}

	// this list is "complete" in that it contains every SVG attribute
	// that React supports, but the types can be improved.
	// Full list here: https://facebook.github.io/react/docs/dom-elements.html
	//
	// The three broad type categories are (in order of restrictiveness):
	//   - "number | string"
	//   - "string"
	//   - union of string literals
	interface SVGAttributes<T extends EventTarget> extends AriaAttributes {
		// Attributes which also defined in HTMLAttributes
		className?: string | undefined | null;
		class?: string | undefined | null;
		color?: string | undefined | null;
		height?: number | string | undefined | null;
		id?: string | undefined | null;
		lang?: string | undefined | null;
		max?: number | string | undefined | null;
		media?: string | undefined | null;
		method?: string | undefined | null;
		min?: number | string | undefined | null;
		name?: string | undefined | null;
		style?: string | undefined | null;
		target?: string | undefined | null;
		type?: string | undefined | null;
		width?: number | string | undefined | null;

		// Other HTML properties supported by SVG elements in browsers
		role?: string | undefined | null;
		tabindex?: number | undefined | null;
		crossorigin?: 'anonymous' | 'use-credentials' | '' | undefined | null;

		// SVG Specific attributes
		'accent-height'?: number | string | undefined | null;
		accumulate?: 'none' | 'sum' | undefined | null;
		additive?: 'replace' | 'sum' | undefined | null;
		'alignment-baseline'?:
			| 'auto'
			| 'baseline'
			| 'before-edge'
			| 'text-before-edge'
			| 'middle'
			| 'central'
			| 'after-edge'
			| 'text-after-edge'
			| 'ideographic'
			| 'alphabetic'
			| 'hanging'
			| 'mathematical'
			| 'inherit'
			| undefined
			| null;
		allowReorder?: 'no' | 'yes' | undefined | null;
		alphabetic?: number | string | undefined | null;
		amplitude?: number | string | undefined | null;
		'arabic-form'?: 'initial' | 'medial' | 'terminal' | 'isolated' | undefined | null;
		ascent?: number | string | undefined | null;
		attributeName?: string | undefined | null;
		attributeType?: string | undefined | null;
		autoReverse?: number | string | undefined | null;
		azimuth?: number | string | undefined | null;
		baseFrequency?: number | string | undefined | null;
		'baseline-shift'?: number | string | undefined | null;
		baseProfile?: number | string | undefined | null;
		bbox?: number | string | undefined | null;
		begin?: number | string | undefined | null;
		bias?: number | string | undefined | null;
		by?: number | string | undefined | null;
		calcMode?: number | string | undefined | null;
		'cap-height'?: number | string | undefined | null;
		clip?: number | string | undefined | null;
		'clip-path'?: string | undefined | null;
		clipPathUnits?: number | string | undefined | null;
		'clip-rule'?: number | string | undefined | null;
		'color-interpolation'?: number | string | undefined | null;
		'color-interpolation-filters'?: 'auto' | 'sRGB' | 'linearRGB' | 'inherit' | undefined | null;
		'color-profile'?: number | string | undefined | null;
		'color-rendering'?: number | string | undefined | null;
		contentScriptType?: number | string | undefined | null;
		contentStyleType?: number | string | undefined | null;
		cursor?: number | string | undefined | null;
		cx?: number | string | undefined | null;
		cy?: number | string | undefined | null;
		d?: string | undefined | null;
		decelerate?: number | string | undefined | null;
		descent?: number | string | undefined | null;
		diffuseConstant?: number | string | undefined | null;
		direction?: number | string | undefined | null;
		display?: number | string | undefined | null;
		divisor?: number | string | undefined | null;
		'dominant-baseline'?: number | string | undefined | null;
		dur?: number | string | undefined | null;
		dx?: number | string | undefined | null;
		dy?: number | string | undefined | null;
		edgeMode?: number | string | undefined | null;
		elevation?: number | string | undefined | null;
		'enable-background'?: number | string | undefined | null;
		end?: number | string | undefined | null;
		exponent?: number | string | undefined | null;
		externalResourcesRequired?: number | string | undefined | null;
		fill?: string | undefined | null;
		'fill-opacity'?: number | string | undefined | null;
		'fill-rule'?: 'nonzero' | 'evenodd' | 'inherit' | undefined | null;
		filter?: string | undefined | null;
		filterRes?: number | string | undefined | null;
		filterUnits?: number | string | undefined | null;
		'flood-color'?: number | string | undefined | null;
		'flood-opacity'?: number | string | undefined | null;
		focusable?: number | string | undefined | null;
		'font-family'?: string | undefined | null;
		'font-size'?: number | string | undefined | null;
		'font-size-adjust'?: number | string | undefined | null;
		'font-stretch'?: number | string | undefined | null;
		'font-style'?: number | string | undefined | null;
		'font-variant'?: number | string | undefined | null;
		'font-weight'?: number | string | undefined | null;
		format?: number | string | undefined | null;
		from?: number | string | undefined | null;
		fx?: number | string | undefined | null;
		fy?: number | string | undefined | null;
		g1?: number | string | undefined | null;
		g2?: number | string | undefined | null;
		'glyph-name'?: number | string | undefined | null;
		'glyph-orientation-horizontal'?: number | string | undefined | null;
		'glyph-orientation-vertical'?: number | string | undefined | null;
		glyphRef?: number | string | undefined | null;
		gradientTransform?: string | undefined | null;
		gradientUnits?: string | undefined | null;
		hanging?: number | string | undefined | null;
		href?: string | undefined | null;
		'horiz-adv-x'?: number | string | undefined | null;
		'horiz-origin-x'?: number | string | undefined | null;
		ideographic?: number | string | undefined | null;
		'image-rendering'?: number | string | undefined | null;
		in2?: number | string | undefined | null;
		in?: string | undefined | null;
		intercept?: number | string | undefined | null;
		k1?: number | string | undefined | null;
		k2?: number | string | undefined | null;
		k3?: number | string | undefined | null;
		k4?: number | string | undefined | null;
		k?: number | string | undefined | null;
		kernelMatrix?: number | string | undefined | null;
		kernelUnitLength?: number | string | undefined | null;
		kerning?: number | string | undefined | null;
		keyPoints?: number | string | undefined | null;
		keySplines?: number | string | undefined | null;
		keyTimes?: number | string | undefined | null;
		lengthAdjust?: number | string | undefined | null;
		'letter-spacing'?: number | string | undefined | null;
		'lighting-color'?: number | string | undefined | null;
		limitingConeAngle?: number | string | undefined | null;
		local?: number | string | undefined | null;
		'marker-end'?: string | undefined | null;
		markerHeight?: number | string | undefined | null;
		'marker-mid'?: string | undefined | null;
		'marker-start'?: string | undefined | null;
		markerUnits?: number | string | undefined | null;
		markerWidth?: number | string | undefined | null;
		mask?: string | undefined | null;
		maskContentUnits?: number | string | undefined | null;
		maskUnits?: number | string | undefined | null;
		mathematical?: number | string | undefined | null;
		mode?: number | string | undefined | null;
		numOctaves?: number | string | undefined | null;
		offset?: number | string | undefined | null;
		opacity?: number | string | undefined | null;
		operator?: number | string | undefined | null;
		order?: number | string | undefined | null;
		orient?: number | string | undefined | null;
		orientation?: number | string | undefined | null;
		origin?: number | string | undefined | null;
		overflow?: number | string | undefined | null;
		'overline-position'?: number | string | undefined | null;
		'overline-thickness'?: number | string | undefined | null;
		'paint-order'?: number | string | undefined | null;
		'panose-1'?: number | string | undefined | null;
		path?: string | undefined | null;
		pathLength?: number | string | undefined | null;
		patternContentUnits?: string | undefined | null;
		patternTransform?: number | string | undefined | null;
		patternUnits?: string | undefined | null;
		'pointer-events'?: number | string | undefined | null;
		points?: string | undefined | null;
		pointsAtX?: number | string | undefined | null;
		pointsAtY?: number | string | undefined | null;
		pointsAtZ?: number | string | undefined | null;
		preserveAlpha?: number | string | undefined | null;
		preserveAspectRatio?: string | undefined | null;
		primitiveUnits?: number | string | undefined | null;
		r?: number | string | undefined | null;
		radius?: number | string | undefined | null;
		refX?: number | string | undefined | null;
		refY?: number | string | undefined | null;
		'rendering-intent'?: number | string | undefined | null;
		repeatCount?: number | string | undefined | null;
		repeatDur?: number | string | undefined | null;
		requiredExtensions?: number | string | undefined | null;
		requiredFeatures?: number | string | undefined | null;
		restart?: number | string | undefined | null;
		result?: string | undefined | null;
		rotate?: number | string | undefined | null;
		rx?: number | string | undefined | null;
		ry?: number | string | undefined | null;
		scale?: number | string | undefined | null;
		seed?: number | string | undefined | null;
		'shape-rendering'?: number | string | undefined | null;
		slope?: number | string | undefined | null;
		spacing?: number | string | undefined | null;
		specularConstant?: number | string | undefined | null;
		specularExponent?: number | string | undefined | null;
		speed?: number | string | undefined | null;
		spreadMethod?: string | undefined | null;
		startOffset?: number | string | undefined | null;
		stdDeviation?: number | string | undefined | null;
		stemh?: number | string | undefined | null;
		stemv?: number | string | undefined | null;
		stitchTiles?: number | string | undefined | null;
		'stop-color'?: string | undefined | null;
		'stop-opacity'?: number | string | undefined | null;
		'strikethrough-position'?: number | string | undefined | null;
		'strikethrough-thickness'?: number | string | undefined | null;
		string?: number | string | undefined | null;
		stroke?: string | undefined | null;
		'stroke-dasharray'?: string | number | undefined | null;
		'stroke-dashoffset'?: string | number | undefined | null;
		'stroke-linecap'?: 'butt' | 'round' | 'square' | 'inherit' | undefined | null;
		'stroke-linejoin'?: 'miter' | 'round' | 'bevel' | 'inherit' | undefined | null;
		'stroke-miterlimit'?: string | undefined | null;
		'stroke-opacity'?: number | string | undefined | null;
		'stroke-width'?: number | string | undefined | null;
		surfaceScale?: number | string | undefined | null;
		systemLanguage?: number | string | undefined | null;
		tableValues?: number | string | undefined | null;
		targetX?: number | string | undefined | null;
		targetY?: number | string | undefined | null;
		'text-anchor'?: string | undefined | null;
		'text-decoration'?: number | string | undefined | null;
		textLength?: number | string | undefined | null;
		'text-rendering'?: number | string | undefined | null;
		to?: number | string | undefined | null;
		transform?: string | undefined | null;
		u1?: number | string | undefined | null;
		u2?: number | string | undefined | null;
		'underline-position'?: number | string | undefined | null;
		'underline-thickness'?: number | string | undefined | null;
		unicode?: number | string | undefined | null;
		'unicode-bidi'?: number | string | undefined | null;
		'unicode-range'?: number | string | undefined | null;
		'units-per-em'?: number | string | undefined | null;
		'v-alphabetic'?: number | string | undefined | null;
		values?: string | undefined | null;
		'vector-effect'?: number | string | undefined | null;
		version?: string | undefined | null;
		'vert-adv-y'?: number | string | undefined | null;
		'vert-origin-x'?: number | string | undefined | null;
		'vert-origin-y'?: number | string | undefined | null;
		'v-hanging'?: number | string | undefined | null;
		'v-ideographic'?: number | string | undefined | null;
		viewBox?: string | undefined | null;
		viewTarget?: number | string | undefined | null;
		visibility?: number | string | undefined | null;
		'v-mathematical'?: number | string | undefined | null;
		widths?: number | string | undefined | null;
		'word-spacing'?: number | string | undefined | null;
		'writing-mode'?: number | string | undefined | null;
		x1?: number | string | undefined | null;
		x2?: number | string | undefined | null;
		x?: number | string | undefined | null;
		xChannelSelector?: string | undefined | null;
		'x-height'?: number | string | undefined | null;
		'xlink:actuate'?: string | undefined | null;
		'xlink:arcrole'?: string | undefined | null;
		'xlink:href'?: string | undefined | null;
		'xlink:role'?: string | undefined | null;
		'xlink:show'?: string | undefined | null;
		'xlink:title'?: string | undefined | null;
		'xlink:type'?: string | undefined | null;
		'xml:base'?: string | undefined | null;
		'xml:lang'?: string | undefined | null;
		xmlns?: string | undefined | null;
		'xmlns:xlink'?: string | undefined | null;
		'xml:space'?: string | undefined | null;
		y1?: number | string | undefined | null;
		y2?: number | string | undefined | null;
		y?: number | string | undefined | null;
		yChannelSelector?: string | undefined | null;
		z?: number | string | undefined | null;
		zoomAndPan?: string | undefined | null;
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface HTMLProps<T extends EventTarget> extends HTMLAttributes<T> {}
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface SVGProps<T extends EventTarget> extends SVGAttributes<T> {}

	interface IntrinsicElements {
		// HTML
		a: HTMLProps<any>;
		abbr: HTMLProps<any>;
		address: HTMLProps<any>;
		area: HTMLProps<any>;
		article: HTMLProps<any>;
		aside: HTMLProps<any>;
		audio: HTMLProps<any>;
		b: HTMLProps<any>;
		base: HTMLProps<any>;
		bdi: HTMLProps<any>;
		bdo: HTMLProps<any>;
		big: HTMLProps<any>;
		blockquote: HTMLProps<any>;
		body: HTMLProps<any>;
		br: HTMLProps<any>;
		button: HTMLProps<any> & { onClick?: () => any };
		canvas: HTMLProps<any>;
		caption: HTMLProps<any>;
		cite: HTMLProps<any>;
		code: HTMLProps<any>;
		col: HTMLProps<any>;
		colgroup: HTMLProps<any>;
		data: HTMLProps<any>;
		datalist: HTMLProps<any>;
		dd: HTMLProps<any>;
		del: HTMLProps<any>;
		details: HTMLProps<any>;
		dfn: HTMLProps<any>;
		dialog: HTMLProps<any>;
		div: HTMLProps<any>;
		dl: HTMLProps<any>;
		dt: HTMLProps<any>;
		em: HTMLProps<any>;
		embed: HTMLProps<any>;
		fieldset: HTMLProps<any>;
		figcaption: HTMLProps<any>;
		figure: HTMLProps<any>;
		footer: HTMLProps<any>;
		form: HTMLProps<any>;
		h1: HTMLProps<any>;
		h2: HTMLProps<any>;
		h3: HTMLProps<any>;
		h4: HTMLProps<any>;
		h5: HTMLProps<any>;
		h6: HTMLProps<any>;
		head: HTMLProps<any>;
		header: HTMLProps<any>;
		hgroup: HTMLProps<any>;
		hr: HTMLProps<any>;
		html: HTMLProps<any>;
		i: HTMLProps<any>;
		iframe: HTMLProps<any>;
		img: HTMLProps<any>;
		input: HTMLProps<any>;
		ins: HTMLProps<any>;
		kbd: HTMLProps<any>;
		keygen: HTMLProps<any>;
		label: HTMLProps<any>;
		legend: HTMLProps<any>;
		li: HTMLProps<any>;
		link: HTMLProps<any>;
		main: HTMLProps<any>;
		map: HTMLProps<any>;
		mark: HTMLProps<any>;
		menu: HTMLProps<any>;
		menuitem: HTMLProps<any>;
		meta: HTMLProps<any>;
		meter: HTMLProps<any>;
		nav: HTMLProps<any>;
		noindex: HTMLProps<any>;
		noscript: HTMLProps<any>;
		object: HTMLProps<any>;
		ol: HTMLProps<any>;
		optgroup: HTMLProps<any>;
		option: HTMLProps<any>;
		output: HTMLProps<any>;
		p: HTMLProps<any>;
		param: HTMLProps<any>;
		picture: HTMLProps<any>;
		pre: HTMLProps<any>;
		progress: HTMLProps<any>;
		q: HTMLProps<any>;
		rp: HTMLProps<any>;
		rt: HTMLProps<any>;
		ruby: HTMLProps<any>;
		s: HTMLProps<any>;
		samp: HTMLProps<any>;
		script: HTMLProps<any>;
		section: HTMLProps<any>;
		select: HTMLProps<any>;
		small: HTMLProps<any>;
		source: HTMLProps<any>;
		span: HTMLProps<any>;
		strong: HTMLProps<any>;
		style: HTMLProps<any>;
		sub: HTMLProps<any>;
		summary: HTMLProps<any>;
		sup: HTMLProps<any>;
		table: HTMLProps<any>;
		tbody: HTMLProps<any>;
		td: HTMLProps<any>;
		textarea: HTMLProps<any>;
		tfoot: HTMLProps<any>;
		th: HTMLProps<any>;
		thead: HTMLProps<any>;
		time: HTMLProps<any>;
		title: HTMLProps<any>;
		tr: HTMLProps<any>;
		track: HTMLProps<any>;
		u: HTMLProps<any>;
		ul: HTMLProps<any>;
		var: HTMLProps<any>;
		video: HTMLProps<any>;
		wbr: HTMLProps<any>;

		svg: SVGProps<any>;

		animate: SVGProps<any>;
		circle: SVGProps<any>;
		clipPath: SVGProps<any>;
		defs: SVGProps<any>;
		desc: SVGProps<any>;
		ellipse: SVGProps<any>;
		feBlend: SVGProps<any>;
		feColorMatrix: SVGProps<any>;
		feComponentTransfer: SVGProps<any>;
		feComposite: SVGProps<any>;
		feConvolveMatrix: SVGProps<any>;
		feDiffuseLighting: SVGProps<any>;
		feDisplacementMap: SVGProps<any>;
		feDistantLight: SVGProps<any>;
		feFlood: SVGProps<any>;
		feFuncA: SVGProps<any>;
		feFuncB: SVGProps<any>;
		feFuncG: SVGProps<any>;
		feFuncR: SVGProps<any>;
		feGaussianBlur: SVGProps<any>;
		feImage: SVGProps<any>;
		feMerge: SVGProps<any>;
		feMergeNode: SVGProps<any>;
		feMorphology: SVGProps<any>;
		feOffset: SVGProps<any>;
		fePointLight: SVGProps<any>;
		feSpecularLighting: SVGProps<any>;
		feSpotLight: SVGProps<any>;
		feTile: SVGProps<any>;
		feTurbulence: SVGProps<any>;
		filter: SVGProps<any>;
		foreignObject: SVGProps<any>;
		g: SVGProps<any>;
		image: SVGProps<any>;
		line: SVGProps<any>;
		linearGradient: SVGProps<any>;
		marker: SVGProps<any>;
		mask: SVGProps<any>;
		metadata: SVGProps<any>;
		path: SVGProps<any>;
		pattern: SVGProps<any>;
		polygon: SVGProps<any>;
		polyline: SVGProps<any>;
		radialGradient: SVGProps<any>;
		rect: SVGProps<any>;
		stop: SVGProps<any>;
		switch: SVGProps<any>;
		symbol: SVGProps<any>;
		text: SVGProps<any>;
		textPath: SVGProps<any>;
		tspan: SVGProps<any>;
		use: SVGProps<any>;
		view: SVGProps<any>;

		[name: string]: { [name: string]: any };
	}
}
