"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
let VoiceComponent = class VoiceComponent {
    showUploadModal = false;
    showUploadCard = false;
    isClosing = false;
    openModal() {
        console.log('openModal called');
        this.showUploadModal = true;
    }
    closeModal() {
        this.showUploadModal = false;
    }
    toggleUploadCard() {
        if (this.showUploadCard && !this.isClosing) {
            this.isClosing = true;
            setTimeout(() => {
                this.showUploadCard = false;
                this.isClosing = false;
            }, 350); // match the animation duration
        }
        else if (!this.showUploadCard) {
            this.showUploadCard = true;
        }
    }
};
exports.VoiceComponent = VoiceComponent;
exports.VoiceComponent = VoiceComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-voice',
        standalone: true,
        imports: [common_1.CommonModule],
        templateUrl: './voice.component.html',
        styleUrls: ['./voice.component.scss']
    })
], VoiceComponent);
//# sourceMappingURL=voice.component.js.map