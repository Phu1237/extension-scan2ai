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
  VResponsive,
  VApp,
  VAppBar,
  VAppBarTitle,
  VNavigationDrawer,
  VMain,
  VContainer,
  VImg,
  VList,
  VListItem,
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText,
  VCardActions,
  VBtn,
  VSpacer,
  VExpandTransition,
  VDivider,
  VRow,
  VCol,
  VSelect,
  VTooltip,
  VIcon,
  VCombobox,
  VCheckboxBtn,
  VTextField,
  VDialog,
  VTextarea,
  VTable
} from 'vuetify/components';
import * as directives from 'vuetify/directives';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VResponsive,
    VApp,
    VAppBar,
    VAppBarTitle,
    VNavigationDrawer,
    VMain,
    VContainer,
    VImg,
    VList,
    VListItem,
    VCard,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VCardActions,
    VBtn,
    VSpacer,
    VExpandTransition,
    VDivider,
    VRow,
    VCol,
    VSelect,
    VTooltip,
    VIcon,
    VCombobox,
    VCheckboxBtn,
    VTextField,
    VDialog,
    VTextarea,
    VTable
  },
  directives
});
