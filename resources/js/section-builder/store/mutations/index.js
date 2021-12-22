import { sectionMutations } from './sectionMutations'
import { layoutMutations } from './layoutMutations'
import { imageEditorMutation } from './imageEditorMutation'
import { altTextMutation } from './altTextMutaion'
import { attachLinkMutation } from './attachLinkMutation'
import { pageMutation } from './pageMutation'
import { pageSettingMutation } from './pageSettingMutation'
import { themeMutation } from './themeMutation'
import { settingMutation } from './settingMutations'
import { iconSelectorMutation } from './iconSelectorMutation'
import { contactFormSettingMutation } from './contactFormSettingMutation'
import { timePickerMutation } from './timePickerMutation'
import { embedLinkMutaion } from './embedLinkMutation'
import { manageMarkersMutation } from './manageMarkersMutaion'
import { promotionMutaion } from './promotionMutation'
import { subscribeMutation } from './subscribeMutation'
import { youtubeVideoMutation } from './youtubeVideoMutation'

export default {
  ...sectionMutations,
  ...layoutMutations,
  ...imageEditorMutation,
  ...attachLinkMutation,
  ...altTextMutation,
  ...pageMutation,
  ...pageSettingMutation,
  ...themeMutation,
  ...settingMutation,
  ...iconSelectorMutation,
  ...contactFormSettingMutation,
  ...timePickerMutation,
  ...embedLinkMutaion,
  ...manageMarkersMutation,
  ...promotionMutaion,
  ...subscribeMutation,
  ...youtubeVideoMutation
}
