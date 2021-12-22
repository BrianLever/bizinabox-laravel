<template>
  <div id="svg_editor" class="svg-editor">
    <template v-if="!isMobile()">
      <div id="workarea" class="workarea" @scroll="scrollWorkarea">
        <div id="svgcanvas" v-loading="!states.is_loaded"></div>
        <span class="helper">
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.98 0.84C5.83333 0.84 6.58667 1.00667 7.24 1.34C7.90667 1.67333 8.42 2.15333 8.78 2.78C9.15333 3.39333 9.34 4.10667 9.34 4.92C9.34 6.36 8.89333 7.42 8 8.1C7.12 8.76667 5.91333 9.1 4.38 9.1L4.32 11.3H3.12L3.04 8.1H3.56C4.93333 8.1 6.01333 7.88667 6.8 7.46C7.6 7.02 8 6.17333 8 4.92C8 4.04 7.72 3.34 7.16 2.82C6.61333 2.3 5.88667 2.04 4.98 2.04C4.07333 2.04 3.35333 2.28667 2.82 2.78C2.28667 3.27333 2.02 3.94667 2.02 4.8H0.68C0.68 4 0.86 3.30667 1.22 2.72C1.59333 2.12 2.1 1.66 2.74 1.34C3.39333 1.00667 4.14 0.84 4.98 0.84ZM3.72 15.1C3.42667 15.1 3.18 15 2.98 14.8C2.79333 14.6 2.7 14.3533 2.7 14.06C2.7 13.7667 2.79333 13.5267 2.98 13.34C3.18 13.14 3.42667 13.04 3.72 13.04C4 13.04 4.23333 13.14 4.42 13.34C4.62 13.5267 4.72 13.7667 4.72 14.06C4.72 14.3533 4.62 14.6 4.42 14.8C4.23333 15 4 15.1 3.72 15.1Z"
              fill="white"
            />
          </svg>
        </span>
        <span class="tutorial" v-if="tutorial" title="Watch Tutorial" @click="getTutorial">
          <img src="/assets/img/tutorial.png" alt="" />
        </span>
        <span class="zoom-toolbar">
          <span class="zoom-button-dec" @click="changeZoom('decrement', $event)">-</span>
          <span class="zoom-value">{{ zoom }}%</span>
          <span class="zoom-button-inc" @click="changeZoom('increment', $event)">+</span>
        </span>
      </div>
      <!--Right Sidebar start-->
      <div id="right-sidebar">
        <div class="item top">
          <span class="item-group">
            <span @click="toBack" title="Move element back" class="placeholder">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" rx="4" fill="#9f9f9f" />
                <rect x="7.39746" y="7.0874" width="18" height="18" rx="3" fill="white" />
                <rect x="7.89746" y="7.5874" width="17" height="17" rx="2.5" stroke="#060C3F" stroke-opacity="0.1" />
              </svg>
            </span>
            <span @click="toFront" title="Move element forward" class="placeholder">
              <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8.23804" y="7.0874" width="18" height="18" rx="3" fill="white" />
                <rect x="8.73804" y="7.5874" width="17" height="17" rx="2.5" stroke="#060C3F" stroke-opacity="0.1" />
                <rect x="0.840332" width="18" height="18" rx="4" fill="#9f9f9f" />
              </svg>
            </span>
          </span>

          <span class="item-group">
            <span @click="undoAction" title="Undo action" class="placeholder">
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 14.9075C0.723858 14.9075 0.5 14.6836 0.5 14.4075C0.5 14.1313 0.723858 13.9075 1 13.9075V14.9075ZM13.3429 14.4075L13.3429 14.9075H13.3429V14.4075ZM13.3429 3.40747V2.90747H13.3429L13.3429 3.40747ZM1 3.40747L0.658279 3.77247C0.557302 3.67794 0.5 3.54579 0.5 3.40747C0.5 3.26915 0.557302 3.137 0.658279 3.04247L1 3.40747ZM3.91315 5.44987C4.11473 5.6386 4.12516 5.95501 3.93643 6.1566C3.7477 6.35818 3.43129 6.36861 3.22971 6.17988L3.91315 5.44987ZM3.22971 0.63506C3.43129 0.446333 3.7477 0.456757 3.93643 0.658342C4.12516 0.859928 4.11473 1.17634 3.91315 1.36507L3.22971 0.63506ZM1 13.9075H13.3429V14.9075H1V13.9075ZM13.3429 14.4075C13.3429 13.9075 13.3426 13.9075 13.3424 13.9075C13.3424 13.9075 13.3422 13.9075 13.3422 13.9075C13.342 13.9075 13.342 13.9075 13.342 13.9075C13.342 13.9075 13.3424 13.9075 13.3431 13.9075C13.3445 13.9075 13.3472 13.9074 13.3512 13.9074C13.3593 13.9072 13.3724 13.907 13.3902 13.9064C13.4259 13.9052 13.4805 13.9028 13.5513 13.8979C13.6931 13.8881 13.8987 13.8682 14.1468 13.828C14.6454 13.7472 15.3022 13.5865 15.9528 13.2703C16.6018 12.9548 17.2335 12.4901 17.7037 11.8044C18.1713 11.1225 18.5 10.192 18.5 8.90747H19.5C19.5 10.3729 19.1215 11.505 18.5284 12.3699C17.938 13.231 17.1554 13.7976 16.39 14.1697C15.6263 14.5409 14.8689 14.724 14.3068 14.8151C14.0245 14.8608 13.7882 14.8839 13.6206 14.8955C13.5367 14.9014 13.4698 14.9043 13.4226 14.9059C13.399 14.9066 13.3803 14.907 13.3669 14.9072C13.3602 14.9073 13.3548 14.9074 13.3508 14.9074C13.3488 14.9075 13.3471 14.9075 13.3458 14.9075C13.3451 14.9075 13.3446 14.9075 13.3441 14.9075C13.3438 14.9075 13.3435 14.9075 13.3434 14.9075C13.3431 14.9075 13.3429 14.9075 13.3429 14.4075ZM18.5 8.90747C18.5 7.62291 18.1713 6.69248 17.7037 6.01055C17.2335 5.32479 16.6018 4.86012 15.9528 4.54466C15.3022 4.2284 14.6454 4.06776 14.1468 3.98697C13.8987 3.94677 13.6931 3.92686 13.5513 3.91701C13.4805 3.9121 13.4259 3.90971 13.3902 3.90855C13.3724 3.90797 13.3593 3.9077 13.3512 3.90758C13.3472 3.90751 13.3445 3.90749 13.3431 3.90748C13.3424 3.90747 13.342 3.90747 13.342 3.90747C13.342 3.90747 13.342 3.90747 13.3422 3.90747C13.3422 3.90747 13.3424 3.90747 13.3424 3.90747C13.3426 3.90747 13.3429 3.90747 13.3429 3.40747C13.3429 2.90747 13.3431 2.90747 13.3434 2.90747C13.3435 2.90747 13.3438 2.90747 13.3441 2.90747C13.3446 2.90747 13.3451 2.90747 13.3458 2.90748C13.3471 2.90748 13.3488 2.90749 13.3508 2.90751C13.3548 2.90754 13.3602 2.90759 13.3669 2.9077C13.3803 2.90791 13.399 2.90831 13.4226 2.90908C13.4698 2.9106 13.5367 2.91359 13.6206 2.91941C13.7882 2.93106 14.0245 2.95411 14.3068 2.99985C14.8689 3.09094 15.6263 3.27405 16.39 3.64529C17.1554 4.01733 17.938 4.58391 18.5284 5.44502C19.1215 6.30997 19.5 7.44204 19.5 8.90747H18.5ZM13.3429 3.90747H1V2.90747H13.3429V3.90747ZM1.34172 3.04247L3.91315 5.44987L3.22971 6.17988L0.658279 3.77247L1.34172 3.04247ZM0.658279 3.04247L3.22971 0.63506L3.91315 1.36507L1.34172 3.77247L0.658279 3.04247Z"
                  fill="#3A58F9"
                />
              </svg>
            </span>
            <span @click="redoAction" title="Redo action" class="placeholder">
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 14.9075C19.2761 14.9075 19.5 14.6836 19.5 14.4075C19.5 14.1313 19.2761 13.9075 19 13.9075V14.9075ZM6.65714 14.4075L6.65714 14.9075H6.65714V14.4075ZM6.65714 3.40747V2.90747H6.65714L6.65714 3.40747ZM19 3.40747L19.3417 3.77247C19.4427 3.67794 19.5 3.54579 19.5 3.40747C19.5 3.26915 19.4427 3.137 19.3417 3.04247L19 3.40747ZM16.0869 5.44987C15.8853 5.6386 15.8748 5.95501 16.0636 6.1566C16.2523 6.35818 16.5687 6.36861 16.7703 6.17988L16.0869 5.44987ZM16.7703 0.63506C16.5687 0.446333 16.2523 0.456757 16.0636 0.658342C15.8748 0.859928 15.8853 1.17634 16.0869 1.36507L16.7703 0.63506ZM19 13.9075H6.65714V14.9075H19V13.9075ZM6.65714 14.4075C6.65714 13.9075 6.65736 13.9075 6.65755 13.9075C6.65759 13.9075 6.65777 13.9075 6.65784 13.9075C6.65799 13.9075 6.65805 13.9075 6.65803 13.9075C6.65798 13.9075 6.65761 13.9075 6.6569 13.9075C6.65549 13.9075 6.65276 13.9074 6.64875 13.9074C6.64075 13.9072 6.62765 13.907 6.60981 13.9064C6.57411 13.9052 6.5195 13.9028 6.4487 13.8979C6.30694 13.8881 6.10126 13.8682 5.85319 13.828C5.35462 13.7472 4.69776 13.5865 4.04717 13.2703C3.39821 12.9548 2.76653 12.4901 2.29629 11.8044C1.82869 11.1225 1.5 10.192 1.5 8.90747H0.5C0.5 10.3729 0.878456 11.505 1.47156 12.3699C2.06204 13.231 2.84465 13.7976 3.60997 14.1697C4.37366 14.5409 5.1311 14.724 5.69324 14.8151C5.97552 14.8608 6.21181 14.8839 6.37942 14.8955C6.46331 14.9014 6.53025 14.9043 6.57741 14.9059C6.60101 14.9066 6.61968 14.907 6.63307 14.9072C6.63977 14.9073 6.64516 14.9074 6.64918 14.9074C6.6512 14.9075 6.65287 14.9075 6.6542 14.9075C6.65486 14.9075 6.65544 14.9075 6.65593 14.9075C6.65618 14.9075 6.65648 14.9075 6.6566 14.9075C6.65688 14.9075 6.65714 14.9075 6.65714 14.4075ZM1.5 8.90747C1.5 7.62291 1.82869 6.69248 2.29629 6.01055C2.76653 5.32479 3.39821 4.86012 4.04717 4.54466C4.69776 4.2284 5.35462 4.06776 5.85319 3.98697C6.10126 3.94677 6.30694 3.92686 6.4487 3.91701C6.5195 3.9121 6.57411 3.90971 6.60981 3.90855C6.62765 3.90797 6.64075 3.9077 6.64875 3.90758C6.65276 3.90751 6.65549 3.90749 6.6569 3.90748C6.65761 3.90747 6.65798 3.90747 6.65803 3.90747C6.65805 3.90747 6.65799 3.90747 6.65784 3.90747C6.65777 3.90747 6.65759 3.90747 6.65755 3.90747C6.65736 3.90747 6.65714 3.90747 6.65714 3.40747C6.65714 2.90747 6.65688 2.90747 6.6566 2.90747C6.65648 2.90747 6.65618 2.90747 6.65593 2.90747C6.65544 2.90747 6.65486 2.90747 6.6542 2.90748C6.65287 2.90748 6.6512 2.90749 6.64918 2.90751C6.64516 2.90754 6.63977 2.90759 6.63307 2.9077C6.61968 2.90791 6.60101 2.90831 6.57741 2.90908C6.53025 2.9106 6.46331 2.91359 6.37942 2.91941C6.21181 2.93106 5.97552 2.95411 5.69324 2.99985C5.1311 3.09094 4.37366 3.27405 3.60997 3.64529C2.84465 4.01733 2.06204 4.58391 1.47156 5.44502C0.878456 6.30997 0.5 7.44204 0.5 8.90747H1.5ZM6.65714 3.90747H19V2.90747H6.65714V3.90747ZM18.6583 3.04247L16.0869 5.44987L16.7703 6.17988L19.3417 3.77247L18.6583 3.04247ZM19.3417 3.04247L16.7703 0.63506L16.0869 1.36507L18.6583 3.77247L19.3417 3.04247Z"
                  fill="#3A58F9"
                />
              </svg>
            </span>
          </span>

          <span @click="remove" title="Delete">
            <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.94283 17.7104C1.94283 17.7104 2.22719 19 3.69089 19H10.3091C11.7727 19 12.0571 17.7104 12.0571 17.7104L13.3636 5.06669H0.636351L1.94283 17.7104ZM9.54547 6.96672C9.54547 6.61691 9.83033 6.3334 10.1818 6.3334C10.5333 6.3334 10.8182 6.61691 10.8182 6.96672L10.1818 16.4667C10.1818 16.8165 9.89689 17.1 9.54547 17.1C9.19406 17.1 8.90912 16.8165 8.90912 16.4667L9.54547 6.96672ZM6.36365 6.96672C6.36365 6.61691 6.64858 6.3334 7 6.3334C7.35149 6.3334 7.63635 6.61691 7.63635 6.96672V16.4667C7.63635 16.8165 7.35149 17.1 7 17.1C6.64851 17.1 6.36365 16.8165 6.36365 16.4667V6.96672ZM3.81817 6.33333C4.16966 6.33333 4.45453 6.61684 4.45453 6.96665L5.09095 16.4667C5.09095 16.8165 4.80602 17.1 4.45453 17.1C4.10311 17.1 3.81817 16.8164 3.81817 16.4667L3.18182 6.96672C3.18182 6.61691 3.46676 6.33333 3.81817 6.33333ZM12.9818 2.53434H10.1818V1.26671C10.1818 0.305867 9.86959 0 8.90912 0H5.09088C4.20991 0 3.81817 0.42469 3.81817 1.26671V2.53441H1.0182C0.45545 2.53441 0 2.95952 0 3.48485C0 4.01024 0.45545 4.43536 1.0182 4.43536H12.9818C13.5445 4.43536 14 4.01024 14 3.48485C14 2.95952 13.5445 2.53434 12.9818 2.53434ZM8.90912 2.53434H5.09095L5.09102 1.26664H8.90919V2.53434H8.90912Z"
                fill="#DE183C"
              />
            </svg>
          </span>
        </div>

        <div v-show="!isSelected()" class="item">
          <label>background</label>
          <span class="color-picker">
            <color-picker @input="onChangeBackground" :color="attributes.background" v-model="attributes.background"></color-picker>
          </span>
        </div>

        <div v-show="isSelected()">
          <div class="item">
            <label>ALIGN ITEMS</label>
            <div>
              <el-button @click="alignHorizontal()" type="default" size="small">
                <svg width="20" height="20" style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5">
                  <rect x="0.5" y="0.5" width="43.5" height="43.49" fill="#fff" stroke="#000" stroke-miterlimit="10" />
                  <rect x="4.5" y="21.9" width="35.8" height="1.32" />
                  <polygon points="22.3 16.8 16.5 10 19.5 10 19.5 4.6 25.2 4.6 25.2 10 28.1 10 22.3 16.8" />
                  <polygon points="22.3 28.2 28.1 34.9 25 34.9 25 40.3 19.4 40.3 19.4 34.9 16.5 34.9 22.3 28.2" />
                </svg>
                HORIZONTAL
              </el-button>
              <el-button @click="alignVertical()" type="default" size="small">
                <svg width="20" height="20" style="margin-right: 6px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44.5 44.5">
                  <rect x="0.5" y="0.5" width="43.5" height="43.49" transform="translate(44.5) rotate(90)" fill="#fff" stroke="#000" stroke-miterlimit="10" />
                  <rect x="21.4" y="4.5" width="1.3" height="35.77" />
                  <polygon points="27.8 22.3 34.6 16.5 34.6 19.5 40 19.5 40 25.2 34.6 25.2 34.6 28.1 27.8 22.3" />
                  <polygon points="16.4 22.3 9.7 28.1 9.7 25 4.3 25 4.3 19.4 9.7 19.4 9.7 16.5 16.4 22.3" />
                </svg>
                VERTICAL
              </el-button>
            </div>
          </div>

          <div v-show="isTextSelected()" class="item text-edit">
            <label for="text-input">text</label>
            <span class="text-type">
              <input @keyup="onChangeText" v-model="attributes.text.value" id="text-input" ref="text" type="text" />
              <label :class="{ active: attributes.text.font.bold }" class="placeholder" title="Bold">
                <input @click="onChangeBold" v-model="attributes.text.font.bold" class="checkbox" type="checkbox" />
                <span class="radio-custom"><strong>B</strong></span>
              </label>
              <label :class="{ active: attributes.text.font.italic }" class="placeholder" title="Italic">
                <input @click="onChangeItalic" v-model="attributes.text.font.italic" class="checkbox" type="checkbox" />
                <span class="radio-custom"><em>I</em></span>
              </label>
              <label :class="{ active: attributes.text.isUpperCase }" class="placeholder" title="Upper case">
                <input @click="onChangeRegister" v-model="attributes.text.isUpperCase" class="checkbox" type="checkbox" />
                <span class="radio-custom"><span>AA</span></span>
              </label>
            </span>
          </div>
          <div v-if="!isLineSelected()" class="item h-auto py-2">
            <label class="d-flex justify-content-between">
              <span> fill </span>
              <select name="type" class="bg_type" v-model="fill_type">
                <option value="solid">Solid</option>
                <option value="gradient">Gradient</option>
              </select>
            </label>
            <span class="color-picker" v-show="fill_type === 'solid'">
              <color-picker @input="onChangeFillColor" :color="attributes.color.fill" v-model="attributes.color.fill"></color-picker>
            </span>
            <span class="color-picker" v-if="fill_type === 'gradient'">
              <gradient-picker
                name="fill-gradient-picker"
                :gradient="fill_gradient"
                :isGradient="true"
                :onStartChange="(color) => onChangeFillGradientColor(color, 'start', false)"
                :onChange="(color) => onChangeFillGradientColor(color, 'change', true)"
                :onEndChange="(color) => onChangeFillGradientColor(color, 'end', true)"
              ></gradient-picker>

              <p class="mb-0"><b>Presets</b></p>
              <div class="preset_category_area">
                <ul class="gradient_preset_area">
                  <li class="folder_item" v-for="(preset_cat, p_key) in gradient_preset_cats:">
                    <img src="/assets/img/folder.png" alt="" class="folder_img" /> {{ preset_cat.name }}
                  </li>
                </ul>
              </div>
            </span>
          </div>
          <div class="item h-auto py-2">
            <label class="d-flex justify-content-between">
              <span> stroke color </span>
              <select name="type" class="bg_type" v-model="stroke_type">
                <option value="solid">Solid</option>
                <option value="gradient">Gradient</option>
              </select>
            </label>
            <span class="color-picker" v-show="stroke_type === 'solid'">
              <color-picker @input="onChangeStrokeColor" :color="attributes.stroke.color" v-model="attributes.stroke.color"></color-picker>
            </span>
            <span class="color-picker" v-if="stroke_type === 'gradient'">
              <gradient-picker
                name="stroke-gradient-picker"
                :gradient="stroke_gradient"
                :isGradient="true"
                :onStartChange="(color) => onChangeStrokeGradientColor(color, 'start', false)"
                :onChange="(color) => onChangeStrokeGradientColor(color, 'change', true)"
                :onEndChange="(color) => onChangeStrokeGradientColor(color, 'end', true)"
              ></gradient-picker>
            </span>
          </div>
        </div>

        <div v-show="isTextSelected()">
          <div class="font-item">
            <label>font</label>
            <select-font v-model="attributes.text.font.name" :font="{ name: attributes.text.font.name }" @input="onChangeFont"> </select-font>
          </div>
          <div class="item">
            <label>font size</label>
            <span class="size-input">
              <input @keypress="isNumber($event)" @keyup="onChangeFontSize($event)" :value="attributes.text.font.size" type="text" />
              <span>
                <input-range
                  :value="attributes.text.font.size"
                  v-model="attributes.text.font.size"
                  @input="onChangeFontSize"
                  :min="attributes.text.font.min"
                  :max="attributes.text.font.max"
                  :interval="attributes.text.font.interval"
                  ref="slider-font-size"
                ></input-range>
              </span>
            </span>
          </div>
          <div class="item">
            <label>letter spacing</label>
            <span class="size-input">
              <input @keypress="isNumber($event)" @keyup="onChangeLetterSpacing($event)" :value="attributes.text.letterSpacing.value" type="text" />
              <span>
                <input-range
                  :value="attributes.text.letterSpacing.value"
                  v-model="attributes.text.letterSpacing.value"
                  @input="onChangeLetterSpacing"
                  :min="attributes.text.letterSpacing.min"
                  :max="attributes.text.letterSpacing.max"
                  :interval="attributes.text.letterSpacing.interval"
                  ref="slider-letter-spacing"
                ></input-range>
              </span>
            </span>
          </div>
        </div>

        <div v-show="isSelected()">
          <div class="item">
            <label>opacity</label>
            <span class="size-input">
              <input @keypress="isNumber($event)" @keyup="onChangeOpacity($event)" :value="attributes.opacity.value" type="text" />
              <span>
                <input-range
                  :value="attributes.opacity.value"
                  v-model="attributes.opacity.value"
                  @input="onChangeOpacity"
                  :min="attributes.opacity.min"
                  :max="attributes.opacity.max"
                  :interval="attributes.opacity.interval"
                  ref="slider-opacity"
                ></input-range>
              </span>
            </span>
          </div>

          <div class="item">
            <label>blur</label>
            <span class="size-input">
              <input @keypress="isNumber($event)" @keyup="onChangeBlur($event)" :value="attributes.blur.value" type="text" />
              <span>
                <input-range
                  :value="attributes.blur.value"
                  v-model="attributes.blur.value"
                  @input="onChangeBlur"
                  :min="attributes.blur.min"
                  :max="attributes.blur.max"
                  :interval="attributes.blur.interval"
                  ref="slider-blur"
                ></input-range>
              </span>
            </span>
          </div>

          <div class="item">
            <label>stroke</label>
            <span class="size-input">
              <input @keypress="isNumber($event)" @keyup="onChangeStroke($event)" :value="attributes.stroke.value" type="text" />
              <span>
                <input-range
                  :value="attributes.stroke.value"
                  v-model="attributes.stroke.value"
                  @input="onChangeStroke"
                  :min="attributes.stroke.min"
                  :max="attributes.stroke.max"
                  :interval="attributes.stroke.interval"
                  ref="slider-stroke"
                ></input-range>
              </span>
            </span>
          </div>
        </div>
        <div class="select-item-to-edit" v-show="!isSelected()">
          <img src="../../images/icons/select-item-to-edit.svg" alt="" />
          <span>Select an item to edit</span>
        </div>
      </div>
      <!--Right Sidebar end-->

      <!--Left Sidebar start-->
      <div id="left-sidebar" ref="left-sidebar">
        <span @click="toolSelect" :data-tool-type="tools.types.select">
          <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.637 10.1287L1.33576 0.812602L0 0L0.314857 1.53873L3.97183 19.383L4.30304 21L5.20809 19.6232L9.34893 13.3228L16.4639 11.3778L18 10.9578L16.637 10.1287V10.1287ZM1.96547 2.80018L14.5693 10.4732L8.74375 12.0655L8.49568 12.1341L8.35393 12.3483L4.97501 17.4902L1.96547 2.80018Z"
              fill="#3A58F9"
            />
          </svg>
          Select
        </span>
        <span @click="toolText" :data-tool-type="tools.types.text">
          <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0V1H6V15H5V1H1V0H10Z" fill="#3A58F9" />
            <rect x="10" width="1" height="3" fill="#3A58F9" />
            <rect width="1" height="3" fill="#3A58F9" />
          </svg>
          Text
        </span>
        <span @click="toolRectangle" :data-tool-type="tools.types.rect">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="20" height="20" stroke="#3A58F9" />
          </svg>
          Rectangle
        </span>
        <span @click="toolEllipse" :data-tool-type="tools.types.ellipse">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5" cy="10.5" r="10" stroke="#3A58F9" />
          </svg>
          Ellipse
        </span>
        <span @click="toolLine" :data-tool-type="tools.types.line">
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 20.5L20.5 1" stroke="#3A58F9" />
          </svg>
          Line
        </span>
        <span @click="$refs['custom-image-input'].click()">
          <input type="file" ref="custom-image-input" @change="addCustomImage" style="display: none" />
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="27" height="27" rx="1.5" stroke="#3A58F9" />
            <circle cx="14" cy="14" r="6" stroke="#3A58F9" stroke-width="2" />
            <circle cx="22.5" cy="5.5" r="1.5" fill="#3A58F9" />
          </svg>
          My image
        </span>
        <div style="display: none">
          <span @click="toolIcons">
            <svg :class="icons.states.isVisible ? 'show' : ''" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="13.5" cy="13.5" r="13" stroke="#3A58F9" />
              <path d="M11 8L16.5 13.5L11 19" stroke="#3A58F9" />
            </svg>
            Icons
          </span>
          <div :class="icons.states.isVisible ? 'show' : ''" class="icons-sidebar">
            <svg class="search" width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.5 8.85416C9.42062 8.03018 10 6.83275 10 5.5C10 3.01472 7.98528 1 5.5 1C3.01472 1 1 3.01472 1 5.5C1 7.98528 3.01472 10 5.5                                           10C6.65253 10 7.70387 9.56672 8.5 8.85416ZM8.5 8.85416L13 13.3542"
                stroke="#3A58F9"
              />
            </svg>
            <input class="icons-input" type="text" placeholder="Search..." />
            <div class="items-icon">
              <div class="item" @click="importImage"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
              <div class="item"></div>
            </div>
          </div>
        </div>
      </div>
      <preview-popup></preview-popup>
      <span class="btn btn-theme premium_btn premium" v-if="is_premium">Premium</span>
      <span class="btn btn-theme premium_btn" v-else>Free</span>
      <input ref="zoom" id="zoom" size="3" value="100%" type="hidden" readonly="readonly" />
      <div :class="icons.states.isVisible ? 'show' : ''" class="overlay"></div>
    </template>

    <template v-else>
      <div class="mobile-editor">
        <div class="mobile-not-supported-message">Mobile version in development.</div>
        <el-button @click="sendLinkToEditor()" class="edit-on-desktop-link" type="primary" icon="el-icon-share"> Send link to email </el-button>
        <p class="edit-on-desktop-text">and continue editing on my desktop</p>
      </div>
    </template>

    <input id="text" type="text" />

    <div class="tutorial_popup_overlay" v-if="tutorial_on" @click="tutorial_on = false">
      <div v-html="tutorial_content" class="tutorial_popup_content"></div>
    </div>
  </div>
</template>

<style lang="scss">
.gradient_preset_area {
  padding-left: 0;
  list-style: none;
  max-height: 250px;
  overflow-y: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  .folder_item {
    border-bottom: 1px solid #eee;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    .folder_img {
      width: 20px;
      margin-right: 10px;
    }
  }
}
.color-preview-area {
  fragment {
    display: inherit;
  }

  .input {
    width: 100% !important;
    outline: 0 !important;
    color: #1f2667 !important;
    border-radius: inherit !important;
    border: 1px solid #bbbfc5 !important;
    height: 24px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    padding: 0 6px !important;
  }
}
.ui-color-picker {
  padding: 10px;
  margin: 0 !important;
  background-color: transparent !important;
  p {
    margin-top: auto !important;
    margin-bottom: auto !important;
  }
}
select.bg_type {
  height: 30px !important;
  width: 130px !important;
}
.tutorial_popup_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9001;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  background: #3338;
  transition: opacity 0.3s;
  transform: translate3D(0, 0, 0);
  -webkit-perspective: 500px;
  .tutorial_popup_content {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    max-width: 640px;
    max-height: 100vh;
    overflow-y: auto;
    border-radius: 2px;
    transition-property: transform, opacity;
    transition-duration: 0.3s;
    transition-delay: 0.05s;
    transition-timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
}
.mobile-editor {
  font-family: Raleway Regular, sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #fff;

  .mobile-not-supported-message {
    font-size: 17px;
    color: #acacac;
    padding-bottom: 20px;
  }

  .edit-on-desktop-link {
    width: 180px;
    margin-bottom: 7px;
  }

  .edit-on-desktop-text {
    color: #acacac;
    font-size: 13px;
    width: 150px;
    text-align: center;
  }
}
.workarea {
  overflow: hidden !important;
}
.editor .tutorial {
  position: fixed;
  width: 40px;
  height: 40px;
  display: flex;
  background-color: #7719be;
  border-radius: 10em;
  bottom: 105px;
  left: 160px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgb(58 88 249 / 30%);
  transition: all 0.3s ease;
  padding: 7px;
  img {
    margin: auto;
    display: inline-block;
    width: 100%;
  }
}
.premium_btn {
  position: fixed;
  width: 130px;
  height: 40px;
  background: transparent;
  border-radius: 0;
  border: 1px solid #4d8ac9;
  color: #4d8ac9;
  top: 105px;
  right: 380px;
  opacity: 0.4;
  &:hover {
    background: transparent;
    border: 1px solid #4d8ac9;
    color: #4d8ac9;
    cursor: default !important;
  }
  &.premium {
    border-color: #7719be;
    color: #7719be;
    &:hover {
      border-color: #7719be;
      color: #7719be;
    }
  }
}
</style>
<style src="../../../../../node_modules/vue-color-gradient-picker/dist/index.css" lang="css" />
<script>
import Driver from 'driver.js'
import appMixin from '../mixins/app-mixin'
import notification from '../mixins/notifications'
import downloadProduct from '../mixins/download-product'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import '../editor_v2/svg-editor'
import { ColorPicker } from 'vue-color-gradient-picker'
import { NS } from '../editor_v2/namespaces.js'

export default {
  name: 'editor',

  mixins: [appMixin, notification, downloadProduct],

  components: {
    'gradient-picker': ColorPicker
  },

  data() {
    return {
      gradient_preset_cats: [],
      defaultGradient: {
        type: 'linear',
        degree: 0,
        points: [
          {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
          },
          {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1
          }
        ]
      },
      fill_type: 'solid',
      stroke_type: 'solid',
      fill_gradient: {
        type: 'linear',
        degree: 0,
        points: []
      },
      stroke_gradient: {
        type: 'linear',
        degree: 0,
        points: []
      },
      unsavedChanges: true,
      logotype: null,
      is_premium: false,
      tutorial: null,
      tutorial_on: false,
      tutorial_content: '',
      states: {
        is_edited: false,
        is_loaded: false,
        isSaving: false
      },
      hash: null,
      canvas: null,
      saveTimer: 10000,
      icons: {
        states: {
          isVisible: false
        }
      },
      attributes: {
        // Main attributes
        background: null,
        opacity: {
          value: 1,
          min: 0,
          max: 1,
          interval: 0.01
        },

        blur: {
          value: 0,
          min: 0,
          max: 10,
          interval: 0.01
        },
        color: {
          fill: '#FFFFFF',
          stroke: null
        },
        stroke: {
          value: 1,
          min: 0,
          max: 10,
          interval: 0.01,
          color: '#000000'
        },

        // Text attributes
        text: {
          value: null,

          font: {
            name: null,
            size: 24,
            bold: false,
            italic: false,
            min: 1,
            max: 200,
            interval: 1
          },

          letterSpacing: {
            value: null,
            min: 0,
            max: this.isFirefox() ? 1000 : 100,
            interval: this.isFirefox() ? 5 : 1
          },

          isUpperCase: false
        }
      },
      tools: {
        activeTool: null,
        types: {
          select: 'select',
          text: 'text',
          rect: 'rect',
          ellipse: 'ellipse',
          line: 'line'
        }
      },
      isSameProps: {
        blur: false,
        opacity: false,
        stroke: {
          width: false
        }
      },
      selected: [],
      navigator: {
        driver: new Driver({
          allowClose: true,
          opacity: 0.5
        }),
        demonstrations: {
          panel: {
            text: false
          }
        }
      },
      zoom: 100
    }
  },

  created() {
    this.stroke_gradient = Object.assign({}, this.defaultGradient)
    this.fill_gradient = Object.assign({}, this.defaultGradient)
  },

  mounted() {
    // window.onbeforeunload = () => (this.unsavedChanges ? true : null);

    EventBus.$on('editor.compilation.completed', () => {
      if (this.isMobile()) {
        return
      }

      const editor = window.svgEditor
      const canvas = editor.canvas

      if (!editor || !canvas) {
        console.error('Instance of editor is not present!')
        return
      }

      this.downloadProtection()
      this.setCanvasWorker(canvas)
        .then(() => {
          // Call another process
          this.listen()
        })
        .then(() => {
          this.downloadLogo().then((response) => {
            this.setLogo(response).then(() => {
              this.startLogoSaver()

              setTimeout(() => {
                this.alignLogo().then(() => {
                  this.actualizeLetterSpacing()
                  this.clearSelected()
                  this.initTippy()
                  this.initTippyForRotate()
                })

                this.states.is_loaded = true
              }, 1000)
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })

      // Save logo after closing the tab
      window.addEventListener('beforeunload', () => {
        this.saveLogo()
      })
    })

    // Fire event when component is mounted
    EventBus.$emit('editor.mounted')
    this.getPresetGradientCats()
  },

  methods: {
    getPresetGradientCats() {
      console.log(1)
      return axios
        .get(route('logotypes.getPresetCategory'))
        .then((response) => {
          if (response.data.status === 1) {
            console.log(response.data.data)
            this.gradient_preset_cats = response.data.data
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    getHexNumber(val) {
      if (val < 0x10) {
        const prefix = '0'
        return prefix + val.toString(16)
      }
      return val.toString(16)
    },
    getGradientColor(elem) {
      var grad = {
          type: 'linear',
          degree: 0,
          points: []
        },
        gradientElem = document.getElementById(elem)
      if (gradientElem.tagName === 'linearGradient') {
        var x1 = parseInt(gradientElem.getAttribute('x1'))
        var x2 = parseInt(gradientElem.getAttribute('x2'))
        var y1 = parseInt(gradientElem.getAttribute('y1'))
        var y2 = parseInt(gradientElem.getAttribute('y2'))

        x1 = x1 - x2
        y1 = y1 - y2
        grad.degree = parseInt((Math.atan2(y1, x1) / Math.PI) * 180 + 270) % 360
      } else {
        grad.type = 'radial'
      }

      const stops = gradientElem.getElementsByTagNameNS(NS.SVG, 'stop')
      if (stops.length > 0) {
        for (var i = 0; i < stops.length; i++) {
          var point = {}
          point.left = parseInt(stops[i].getAttribute('offset'))
          var clr = stops[i].getAttribute('stop-color')
          point.red = parseInt(clr.substr(1, 2), 16)
          point.green = parseInt(clr.substr(3, 2), 16)
          point.blue = parseInt(clr.substr(5, 2), 16)
          point.alpha = parseFloat(stops[i].getAttribute('stop-opacity')) || 1

          grad.points.push(point)
        }
      } else {
        for (var i = 0; i < this.defaultGradient.points.length; i++) {
          grad.points.push(this.defaultGradient.points[i])
        }
      }
      return grad
    },
    makeGradientPaint(attrs) {
      attrs.points.sort((a, b) => a.left - b.left)
      var paint = {
        type: attrs.type + 'Gradient',
        linearGradient: null,
        radialGradient: null
      }

      const anglePI = (attrs.degree + 90) * (Math.PI / 180)
      var angle = {
        x1: Math.round(50 + Math.cos(anglePI) * 50) + '%',
        y1: Math.round(50 + Math.sin(anglePI) * 50) + '%',
        x2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%',
        y2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%'
      }

      var mainGradient

      if (attrs.type === 'linear') {
        paint.linearGradient = document.createElementNS(NS.SVG, 'linearGradient')
        paint.linearGradient.setAttribute('x1', angle.x1)
        paint.linearGradient.setAttribute('y1', angle.y1)
        paint.linearGradient.setAttribute('x2', angle.x2)
        paint.linearGradient.setAttribute('y2', angle.y2)

        mainGradient = paint.linearGradient
      } else {
        paint.radialGradient = document.createElementNS(NS.SVG, 'radialGradient')
        paint.radialGradient.setAttribute('cx', 0.5)
        paint.radialGradient.setAttribute('cy', 0.5)
        paint.radialGradient.setAttribute('r', 1)

        mainGradient = paint.radialGradient
      }

      for (var i = 0; i < attrs.points.length; i++) {
        const point = attrs.points[i]
        const stopEle = document.createElementNS(NS.SVG, 'stop')
        stopEle.setAttribute('offset', attrs.points[i].left + '%')
        stopEle.setAttribute('stop-color', '#' + this.getHexNumber(point.red) + this.getHexNumber(point.green) + this.getHexNumber(point.blue))
        stopEle.setAttribute('stop-opacity', point.alpha)

        mainGradient.appendChild(stopEle)
      }
      return paint
    },
    onChangeFillGradientColor(attrs, name, preventUndo) {
      this.canvas.setFillPaint(this.makeGradientPaint(attrs), preventUndo)
    },
    onChangeStrokeGradientColor(attrs, name, preventUndo) {
      this.canvas.setStrokePaint(this.makeGradientPaint(attrs), preventUndo)
    },
    getTutorial() {
      axios.get(route('logotypes.getTutorial', this.tutorial)).then((response) => {
        this.tutorial_on = true
        this.tutorial_content = response.data.data
      })
    },
    startLogoSaver() {
      let self = this
      let saveLogoClosure = setInterval(function () {
        self.saveLogoWithOldDefs().catch((error) => {
          clearInterval(saveLogoClosure)
          //document.location.reload(true);
        })
      }, this.saveTimer)
    },
    saveLogoWithOldDefs() {
      return new Promise((resolve, reject) => {
        return axios
          .post(route('logotypes.save', this.getHash()), {
            logotype: this.rot13(this.getLogoWithOldDefs(), true)
          })
          .then(() => {
            return resolve()
          })
          .catch((e) => {
            return reject(e)
          })
      })
    },
    saveLogo() {
      return new Promise((resolve, reject) => {
        return axios
          .post(route('logotypes.save', this.getHash()), {
            logotype: this.rot13(this.getLogo(), true)
          })
          .then(() => {
            return resolve()
          })
          .catch((e) => {
            return reject(e)
          })
      })
    },
    saveLogoFinal(exit) {
      return new Promise((resolve, reject) => {
        return axios
          .post(route('logotypes.saveLogo', this.getHash()), {
            logotype: this.rot13(this.getLogo(), true),
            exit: exit
          })
          .then((response) => {
            if (response.data.status === 1) {
              Requester.get(route('download.logotype.preview', this.getHash()))

              if (response.data.data === 'success') {
                EventBus.$emit('editor.saveLogoFinal.saved', [exit])
                this.unsavedChanges = false
              } else if (response.data.data === 'login') {
                this.unsavedChanges = false
                window.location.href = '/login'
              }
            }
            return resolve()
          })
          .catch((e) => {
            return reject(e)
          })
      })
    },

    alignLogo() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // If logo is not editable then align of center workarea
          this.canvas.clearSelection(true)
          this.canvas.selectAllInCurrentLayer()
          this.canvas.groupSelectedElements()
          this.canvas.alignSelectedElements('m', 'page')
          this.canvas.alignSelectedElements('c', 'page')
          this.canvas.ungroupSelectedElement()
          this.canvas.ungroupSelectedElement()
          this.canvas.ungroupSelectedElement()
          this.canvas.ungroupSelectedElement()
          this.canvas.clearSelection(true)
          this.canvas.undoMgr.resetUndoStack()

          return resolve()
        }, 100)
      })
    },

    getLogo() {
      return this.canvas.svgCanvasToString(false)
    },

    getLogoWithOldDefs() {
      return this.canvas.svgCanvasToString(true)
    },

    downloadLogo() {
      return new Promise((resolve, reject) => {
        // Set hash
        this.setHash(document.getElementById('user-logo-hash').value)

        // Load logo
        axios.get(route('logotypes.get', this.getHash())).then((response) => {
          return resolve(response.data)
        })
      })
    },

    setHash(hash) {
      this.hash = hash
    },

    getHash() {
      return this.hash
    },

    setLogo(response) {
      return new Promise((resolve, reject) => {
        let logotype = this.rot13(response.logotype.content)

        this.logotype = logotype
        this.tutorial = response.logotype.tutorial
        this.is_premium = response.logotype.is_premium
        this.states.is_edited = response.logotype.is_edited

        this.canvas.setSvgString(logotype, {
          is_edited: this.states.is_edited
        })

        this.setGlobalHelper()

        return resolve()
      })
    },

    updatePanel() {
      let elements = this.getSelected()

      elements.forEach((element) => {
        if (element) {
          // Set opacity in panel
          this.attributes.opacity.value = this.getDisplayOpacity(element)

          // Set blur in panel
          this.attributes.blur.value = this.getDisplayBlur(element)

          // Set stroke width in panel
          this.attributes.stroke.value = this.getDisplayStroke(element)

          // Set fill color
          this.attributes.color.fill = this.getDisplayFillColor(element)
          this.fill_gradient = Object.assign({}, this.getDisplayFillGradient(element))

          // Set stroke color
          this.attributes.stroke.color = this.getDisplayStrokeColor(element)
          this.stroke_gradient = this.getDisplayStrokeGradient(element)

          this.fill_type = 'solid'
          if (this.attributes.color.fill) {
            this.fill_type = 'solid'
          } else {
            setTimeout(
              (_this) => {
                _this.fill_type = 'gradient'
              },
              10,
              this
            )
          }

          this.stroke_type = 'solid'

          if (this.attributes.stroke.color) {
            this.stroke_type = 'solid'
          } else {
            setTimeout(
              (_this) => {
                _this.stroke_type = 'gradient'
              },
              10,
              this
            )
          }

          if (this.isTextSelected()) {
            // Set text value
            this.attributes.text.value = this.getDisplayText(element)

            // Set font name in panel
            this.attributes.text.font.name = this.getElementFont(element)

            // Set font size in panel
            this.attributes.text.font.size = this.getElementFontSize(element)

            // Set bold style for text
            this.attributes.text.font.bold = this.textIsBold(element)

            // Set italic style for text
            this.attributes.text.font.italic = this.textIsItalic(element)

            // Set upper-case for text
            this.attributes.text.isUpperCase = this.textIsInUpperCase(element)

            // Set letter-spacing for text
            this.attributes.text.letterSpacing.value = this.getDisplayLetterSpacing(element)
          }
        }
      })

      this.refreshRanges()
    },

    updateBackground() {
      this.attributes.background = this.canvas.getBackgroundColor()
    },

    getDisplayText(element) {
      return this.getText(element)
    },

    isSelected() {
      return !!this.selected[0]
    },

    isTextSelected() {
      return this.selected[0] && this.selected[0].nodeName === 'text' && this.elementsAreSame()
    },

    isLineSelected() {
      try {
        const selected = this.getFirstSelected()

        return selected.nodeName === 'line'
      } catch (e) {
        return false
      }
    },

    getSelected() {
      let items = this.canvas.getSelectedElems()

      return this.cleanItems(items)
    },

    getFirstSelected() {
      return this.getSelected()[0]
    },

    elementsAreSame() {
      let selected = this.getSelected()

      if (selected.length > 1) {
        let nodeName = selected[0].nodeName
        let isSame = true

        selected.forEach((item) => {
          if (item.nodeName !== nodeName) {
            isSame = false
          }
        })

        return isSame
      }

      return true
    },

    isMultiselected() {
      return this.getSelected().length > 1
    },

    setPropertiesSame() {
      let self = this

      let blur = []
      let opacity = []
      let stroke = []

      let elements = this.getSelected()

      elements.forEach(function (element) {
        blur.push(self.getElementBlur(element))
        opacity.push(self.getElementOpacity(element))
        stroke.push(self.getElementStroke(element))
      })

      this.isSameProps.blur = this.arrayValuesIsSame(blur)
      this.isSameProps.opacity = this.arrayValuesIsSame(opacity)
      this.isSameProps.stroke.width = this.arrayValuesIsSame(stroke)
    },

    arrayValuesIsSame(elements) {
      return elements.every((val, i, arr) => val === arr[0])
    },

    // Get real element property value
    getElementBlur(element) {
      return this.canvas.getBlur(element)
    },

    getElementOpacity(element) {
      return this.canvas.getOpacity(element)
    },

    getElementStroke(element) {
      return this.canvas.getStrokeWidth(element)
    },

    getElementFont(element) {
      return this.canvas.getFontFamily(element)
    },

    getElementFontSize(element) {
      return this.canvas.getFontSize(element)
    },

    getElementFillColor(element) {
      let color = element.getAttribute('fill')

      // Try find color in <path> element
      if (!color) {
        let paths = $(element).find('path')
        paths.each(function (i, item) {
          if (paths.length > 1) {
            if ($(item).attr('fill') != '#FFFFFF') {
              color = $(item).attr('fill')
            }
          } else {
            color = $(item).attr('fill')
          }

          return
        })
      }

      return this.prepareColor(color)
    },

    getElementStrokeColor(element) {
      return this.prepareColor(this.canvas.getStrokeColor(element))
    },

    getElementLetterSpacing(element) {
      return this.canvas.getLetterSpacing(element)
    },

    getText(element) {
      return this.canvas.getText()
    },

    textIsBold(element) {
      return this.canvas.getBold(element)
    },

    textIsItalic(element) {
      return this.canvas.getItalic(element)
    },

    textIsInUpperCase(element) {
      if (!element) {
        element = this.getFirstSelected()
      }

      if (this.isTextSelected()) {
        let text = this.getText(element)

        if (text.length > 0) {
          return text === text.toUpperCase()
        }
      }

      return false
    },

    // Get display in <input> property value
    getDisplayOpacity(element) {
      if (this.isMultiselected()) {
        if (!this.isSameProps.opacity) return null

        return this.getElementOpacity()
      }

      return this.getElementOpacity(element)
    },

    getDisplayBlur(element) {
      if (this.isMultiselected()) {
        if (!this.isSameProps.blur) return null

        return this.getElementBlur()
      }

      return this.getElementBlur(element)
    },

    getDisplayStroke(element) {
      if (this.isMultiselected()) {
        if (!this.isSameProps.stroke.width) return null

        return this.getElementStroke()
      }

      return this.getElementStroke(element)
    },

    getDisplayFillColor(element) {
      //@TODO If its icon, get first color and return
      if (this.isMultiselected()) {
        return null
      }

      var ret = this.getElementFillColor(element)
      if (ret.substr(0, 3) === 'url') {
        return ''
      }

      return ret
    },

    getDisplayStrokeColor(element) {
      if (this.isMultiselected()) {
        return null
      }

      var ret = this.getElementStrokeColor(element)
      if (ret.substr(0, 3) === 'url') {
        return ''
      }

      return ret
    },

    getDisplayFillGradient(element) {
      //@TODO If its icon, get first color and return
      if (this.isMultiselected()) {
        return this.defaultGradient
      }

      var ret = this.getElementFillColor(element)

      if (ret.substr(0, 3) === 'url') {
        var elementId = ret.substr(5, ret.length - 6)
        return this.getGradientColor(elementId)
      }

      return this.defaultGradient
    },

    getDisplayStrokeGradient(element) {
      if (this.isMultiselected()) {
        return this.defaultGradient
      }

      var ret = this.getElementStrokeColor(element)
      if (ret.substr(0, 3) === 'url') {
        var elementId = ret.substr(5, ret.length - 6)
        return this.getGradientColor(elementId)
      }

      return this.defaultGradient
    },

    getDisplayLetterSpacing(element) {
      if (this.isMultiselected()) {
        //if (!this.isSameProps.stroke.width) return null;

        return this.getElementLetterSpacing()
      }

      return this.getElementLetterSpacing(element)
    },

    getVisibleElements() {
      let items = this.canvas.getVisibleElements()

      return _.filter(items, function (item) {
        let excludedIds = ['snap_line_x', 'snap_line_y', 'canvasBackground']

        return !_.includes(excludedIds, item.id)
      })
    },

    // On change properties
    onChangeOpacity(evt) {
      // Change <input> near input-range
      this.onChangeRangeField(this.attributes.opacity, evt)

      // Set value
      this.canvas.changeSelectedAttribute('opacity', this.attributes.opacity.value)
    },

    onChangeBlur(evt) {
      // Change <input> near input-range
      this.onChangeRangeField(this.attributes.blur, evt)

      // Set value
      this.canvas.setBlur(this.attributes.blur.value, true)
    },

    onChangeStroke(evt) {
      // Change <input> near input-range
      this.onChangeRangeField(this.attributes.stroke, evt)

      this.canvas.setStrokeWidth(this.attributes.stroke.value)
    },

    onChangeFont() {
      this.canvas.setFontFamily(this.attributes.text.font.name)
    },

    onChangeText() {
      // Set text
      this.setText(this.attributes.text.value)

      // Check/UnCheck [AA]
      this.attributes.text.isUpperCase = this.textIsInUpperCase()
    },

    onChangeBold() {
      this.canvas.setBold(!this.attributes.text.font.bold)
    },

    onChangeItalic() {
      this.canvas.setItalic(!this.attributes.text.font.italic)
    },

    onChangeRegister() {
      // Get selected element
      let element = this.getFirstSelected()

      // Get text value
      let text = this.getText(element)

      // Selected text to upper/lower case
      let updatedText = text === text.toUpperCase() ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : text.toUpperCase()

      // Update selected text
      return this.setText(updatedText)
    },

    onChangeFillColor() {
      let color = this.prepareColor(this.attributes.color.fill)
      this.canvas.setColor('fill', color)
    },

    onChangeStrokeColor() {
      let color = this.prepareColor(this.attributes.stroke.color)

      this.canvas.setColor('stroke', color)
    },

    onChangeBackground() {
      let color = this.prepareColor(this.attributes.background)

      this.canvas.setBackground(color)
    },

    onChangeFontSize(evt) {
      // Change <input> near input-range
      this.onChangeRangeField(this.attributes.text.font, evt, 'size')

      // Set value
      this.canvas.setFontSize(this.attributes.text.font.size)
    },

    onChangeLetterSpacing(evt) {
      // Change <input> near input-range
      this.onChangeRangeField(this.attributes.text.letterSpacing, evt)

      let value = this.attributes.text.letterSpacing.value

      let isNormalSpacing = false

      // If the value has not changed, then set "normal" spacing
      if (value === 0) {
        isNormalSpacing = true
      }

      // Define value value
      if (isNormalSpacing) {
        value = 'normal'
      }

      // Set value
      this.canvas.setLetterSpacing(value)
    },

    // Draw tools
    toolSelect(ev) {
      this.setTool(this.tools.types.select)
    },
    toolLine(ev) {
      this.setTool(this.tools.types.line)
    },
    toolIcons() {
      this.icons.states.isVisible = !this.icons.states.isVisible
    },
    toolRectangle(ev) {
      this.setTool(this.tools.types.rect)
    },
    toolEllipse(ev) {
      this.setTool(this.tools.types.ellipse)
    },
    toolText(ev) {
      this.setTool(this.tools.types.text)
    },
    setTool(tool) {
      this.canvas.setMode(tool)

      EventBus.$emit('tools.set', {
        tool: tool
      })
    },
    scrollWorkarea(ev) {
      //
    },

    listen() {
      // Selected event for re-rendering Edit panel
      EventBus.$on('leave.window.allow', () => {
        this.unsavedChanges = false
      })
      EventBus.$on('selected.changed', () => {
        this.selected = this.getSelected()

        if (this.isSelected()) {
          this.setPropertiesSame()
          this.updatePanel()
          this.updateBackground()
          this.initHoverHandler()
          this.updateGlobalTextInput()
        }
      })

      EventBus.$on('editor.preview.show', () => {
        // Save logo for actual preview
        this.saveLogo().then(() => {
          Requester.get(route('download.logotype.preview', this.getHash())).then((response) => {
            EventBus.$emit('logotype.preview.set', {
              preview: response.data.preview,
              modal: true
            })

            // Show preview popup
            EventBus.$emit('logotype.preview.popup.show')
          })
        })
      })
      EventBus.$on('editor.preview.saveLogo', ([exit]) => {
        // Save logo for actual preview
        this.saveLogoFinal(exit)
      })

      // Get logotype preview
      EventBus.$on('logotype.preview.get', () => {
        this.saveLogo(0).then(() => {
          Requester.get(route('download.logotype', this.getHash())).then((response) => {
            EventBus.$emit('logotype.preview.set', {
              preview: response.data.logotype.content,
              forDownload: true
            })
          })
        })
      })

      EventBus.$on('editor.panel.text.input.navigator', (data) => {
        // Force show navigator for dbl-click on text
        if (data && data.force_show) {
          this.navigator.demonstrations.panel.text = false
        }
        this.showTextInputNavigator()
      })

      EventBus.$on('tools.set', (data) => {
        // Set active tool
        this.tools.activeTool = data.tool

        // Get sidebar with tools
        let sideBar = this.$refs['left-sidebar']

        // Get tools
        let tools = sideBar.children

        // Set class for active tool
        Array.from(tools).forEach((item) => {
          let toolName = item.getAttribute('data-tool-type')

          if (toolName === data.tool) {
            item.classList.add('active-tool')
          } else {
            item.classList.remove('active-tool')
          }
        })
      })

      EventBus.$on('editor.logotype.save', () => {
        this.saveLogo().then(() => {
          EventBus.$emit('editor.logotype.saved', this.logotype)
        })
      })

      EventBus.$on('zoom.updated', () => {
        this.updateZoom()
      })
    },

    setCanvasWorker(canvas) {
      return new Promise((resolve, reject) => {
        this.canvas = canvas

        this.canvas.bind('selected', () => {
          EventBus.$emit('selected.changed')
        })

        return resolve()
      })
    },

    toFront() {
      this.canvas.moveUpDownSelected('Up')
    },

    toBack() {
      this.canvas.moveUpDownSelected('Down')
    },

    remove() {
      this.canvas.deleteSelectedElements()
    },

    undoAction() {
      this.canvas.undoMgr.undo()
    },

    redoAction() {
      this.canvas.undoMgr.redo()
    },

    setText(text) {
      // Set model
      this.attributes.text.value = text

      // Change text
      this.canvas.setTextContent(text)
    },

    updateGlobalTextInput() {
      const item = this.getFirstSelected()

      if (item && item.nodeName === 'text') {
        const content = item.textContent
        const textInput = this.getGlobalTextInput()

        textInput.setAttribute('value', content)
      }
    },

    getGlobalTextInput() {
      return document.getElementById('text')
    },

    canGroup() {
      return this.selected.length > 1 && this.selected[0] !== null
    },

    canUngroup() {
      if (this.selected.length === 1) {
        let item = this.selected[0]

        if (item && item.tagName === 'g') {
          return true
        }
      }

      return false
    },

    group() {
      this.canvas.groupSelectedElements()
    },

    ungroup() {
      this.canvas.ungroupSelectedElement()
    },

    inRange(x, min, max) {
      return (x - min) * (x - max) <= 0 || x > max
    },

    isNumber: function (evt) {
      evt = evt ? evt : window.event
      let value = parseInt(evt.key)

      if (Number.isInteger(value) || evt.key === '.' || evt.key.indexOf('Arrow') > 0 || evt.key === 'Delete' || evt.key === 'Backspace') {
        return true
      } else {
        evt.preventDefault()
        return false
      }
    },

    onChangeRangeField(structure, evt, key = 'value') {
      // Set custom opacity value from input change
      if (evt.target) {
        let value = parseFloat(evt.target.value)

        // Check value the presence in the right range
        if (this.inRange(value, structure.min, structure.max)) {
          structure[key] = value
        }
      }
    },

    clearSelected() {
      this.selected = []
    },

    refreshRanges() {
      let self = this

      this.$nextTick(() => {
        Object.keys(this.$refs).map(function (name) {
          if (name.indexOf('slider') >= 0) {
            self.$refs[name].$refs.slider.refresh()
          }
        })
      })
    },

    prepareColor(color) {
      let defaultColor = 'none'
      let defaultTextColor = '#3B3B3B'

      if (!color) {
        if (this.isTextSelected()) {
          return defaultTextColor
        }
      }

      // If color is none
      if (!color || color === defaultColor || color === 'undefined' || typeof color === undefined) {
        return defaultColor
      }

      return color
    },

    changeZoom(operation, event) {
      const evt = document.createEvent('MouseEvents')
      evt.initEvent('mousewheel', true, true)
      evt.wheelDelta = 120

      if (operation === 'decrement') {
        evt.wheelDelta = -120
      }

      evt.forceZoom = true

      this.canvas.getSvgRoot().dispatchEvent(evt)

      // Actualize zoom value
      this.updateZoom()
    },

    cleanItems(items) {
      items = items || []
      let cleanItems = []
      items.forEach((item) => {
        if (item) {
          cleanItems.push(item)
        }
      })

      return cleanItems
    },

    focusOnTextInput() {
      setTimeout(() => {
        // Focus
        this.$refs.text.focus()

        // Fix for focus on end text
        let value = this.$refs.text.value
        this.$refs.text.value = ''
        this.$refs.text.value = value
      }, 200)
    },

    showTextInputNavigator() {
      if (this.isTextSelected() && !this.navigator.demonstrations.panel.text) {
        // Show user navigator
        this.navigator.driver.highlight({
          element: '.text-edit',
          popover: {
            title: 'Text control panel',
            description: 'Here you can change the inserted text to fit your needs'
          }
        })

        // Set the flag to show navigation
        this.navigator.demonstrations.panel.text = true
      }
    },

    getDomLogo() {
      return document.getElementById('svgcontent')
    },

    isFirefox() {
      return navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    },

    actualizeLetterSpacing() {
      if (this.isFirefox()) {
        let logo = this.getDomLogo()
        const htmlCollection = logo.getElementsByTagName('text')
        const texts = Array.prototype.slice.call(htmlCollection)

        for (let item of texts) {
          let value = item.getAttribute('letter-spacing')

          if (value) {
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            context.font = parseFloat(item.getAttribute('font-size')) + 'px' + ' ' + item.getAttribute('font-family')

            let px = parseFloat(value)
            let length = px

            // If unit === em
            let unit = value.substr(-2)
            if (unit === 'em') {
              px = parseFloat(value) * parseFloat(item.getAttribute('font-size'))
            }

            // Define text length
            length = this.fillTextWithSpacing(context, item.textContent, 0, 0, px)

            // Set text length attribute
            item.setAttribute('textLength', length)
          }
        }
      }
    },

    fillTextWithSpacing(context, text, x, y, spacing) {
      text = text.trim()

      let wordWidth = context.measureText(text).width
      let char = ''
      let widthShorter = 0
      let charWidth = 0

      do {
        char = text.substr(0, 1)
        text = text.substr(1)
        context.fillText(char, x, y)

        if (text === '') {
          widthShorter = 0
        } else {
          widthShorter = context.measureText(text).width
        }

        charWidth = wordWidth - widthShorter

        x += charWidth + spacing
        wordWidth = widthShorter
      } while (text !== '')

      if (spacing < 0) {
        x = -1 * x
      }

      return x
    },

    sendLinkToEditor() {
      let hash = document.getElementById('user-logo-hash').value

      Requester.get(route('logo.send-editor-link', hash)).then((response) => {
        this.notification({
          title: response.data.status,
          type: response.data.status,
          message: response.data.message
        })
      })
    },

    initTippy() {
      const htmlCollection = document.getElementsByClassName('placeholder')
      const elements = Array.prototype.slice.call(htmlCollection)
      const helper = document.getElementsByClassName('helper')[0]

      tippy(elements, {
        duration: 0,
        theme: 'light',
        content(reference) {
          return reference.getAttribute('title')
        }
      })

      tippy(helper, {
        theme: 'light',
        arrow: true,
        interactive: true,
        placement: 'top-start',
        trigger: 'click',
        animation: 'fade',
        popperOptions: {
          positionFixed: true
        },
        content:
          '<span class="helper-title">Shortcuts</span>' +
          '<div class="helper-content">' +
          '<div class="helper-commands">' +
          '<span class="helper-item">Ctrl+C</span>' +
          '<span class="helper-item">Alt + Mouse Move</span>' +
          '<span class="helper-item">Ctrl+V</span>' +
          '<span class="helper-item">Ctrl+Z</span>' +
          '<span class="helper-item">Ctrl+Shift+Z</span>' +
          '<span class="helper-item">Ctrl+A</span>' +
          '<span class="helper-item">Up</span>' +
          '<span class="helper-item">Down</span>' +
          '<span class="helper-item">Left</span>' +
          '<span class="helper-item">Right</span>' +
          '</div>' +
          '<div class="helper-descriptions">' +
          '<span class="helper-name">Copy</span>' +
          '<span class="helper-name">Copy 2</span>' +
          '<span class="helper-name">Paste</span>' +
          '<span class="helper-name">Undo</span>' +
          '<span class="helper-name">Redo</span>' +
          '<span class="helper-name">Select all</span>' +
          '<span class="helper-name">Move top</span>' +
          '<span class="helper-name">Move bot</span>' +
          '<span class="helper-name">Move left</span>' +
          '<span class="helper-name">Move right</span>' +
          '</div>' +
          '</div>'
      })
    },

    initTippyForRotate() {
      const button = document.getElementById('selectorGrip_rotate')
      tippy(button, {
        trigger: 'click',
        theme: 'light',
        animation: 'fade'
      })
    },

    initHoverHandler() {
      let items = this.getVisibleElements()

      $(items).on({
        mouseover: function () {
          $(items).addClass('not-hover-svg-item')
          $(this).addClass('hover-svg-item')
        },
        mouseout: function () {
          $(items).removeClass('not-hover-svg-item')
          $(this).removeClass('hover-svg-item')
        }
      })
    },

    updateZoom() {
      this.zoom = Math.floor(this.$refs.zoom.getAttribute('value'))
    },

    setGlobalHelper() {
      if (!window.helper) {
        window.helper = {}
      }
    },

    alignVertical() {
      this.canvas.alignSelectedElements('m', 'page')
    },

    alignHorizontal() {
      this.canvas.alignSelectedElements('c', 'page')
    },

    importImage(e) {
      console.log(e)
    },

    addCustomImage(e) {
      this.canvas.importImage(e)
    }
  }
}
</script>
