/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
import {
  VApp,
  VAppBar,
  VAppBarTitle,
  VBtn,
  VCard,
  VCardActions,
  VCardSubtitle,
  VCardText,
  VCardTitle,
  VCheckboxBtn,
  VCol,
  VCombobox,
  VContainer,
  VDialog,
  VDivider,
  VExpandTransition,
  VIcon,
  VImg,
  VList,
  VListItem,
  VListItemSubtitle,
  VListItemTitle,
  VListSubheader,
  VMain,
  VNavigationDrawer,
  VResponsive,
  VRow,
  VSelect,
  VSpacer,
  VTable,
  VTextarea,
  VTextField,
  VTooltip
} from 'vuetify/components';
import * as directives from 'vuetify/directives';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VApp,
    VAppBar,
    VAppBarTitle,
    VBtn,
    VCard,
    VCardActions,
    VCardSubtitle,
    VCardText,
    VCardTitle,
    VCheckboxBtn,
    VCol,
    VCombobox,
    VContainer,
    VDialog,
    VDivider,
    VExpandTransition,
    VIcon,
    VImg,
    VList,
    VListItem,
    VListItemSubtitle,
    VListItemTitle,
    VListSubheader,
    VMain,
    VNavigationDrawer,
    VResponsive,
    VRow,
    VSelect,
    VSpacer,
    VTable,
    VTextarea,
    VTextField,
    VTooltip
  },
  directives
});
