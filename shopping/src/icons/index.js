import Vue from 'vue'
import IconSvg from '@/components/SvgIcon'

Vue.component('svg-icon', IconSvg);

const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);