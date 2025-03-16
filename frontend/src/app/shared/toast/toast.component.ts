// basic
import { Component, EventEmitter, Input, Output } from "@angular/core";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCheck, faExclamation, faBan, faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";

// enums
import { ToastTypes } from "./toast.enums";

@Component({
    selector: "shared-toast",
    imports: [FontAwesomeModule],
    templateUrl: "./toast.component.html",
    styleUrl: "./toast.component.css",
})
export class ToastComponent {
    @Input() type: ToastTypes;
    @Input() message: string;
    @Input() duration: number;
    @Input() button: string;
    @Output() toastClosed = new EventEmitter<void>();
    @Output() buttonClicked = new EventEmitter<void>();

    closeIcon = faXmark;

    iconMap = {
        [ToastTypes.Success]: faCheck,
        [ToastTypes.Warning]: faExclamation,
        [ToastTypes.Danger]: faBan,
        [ToastTypes.Info]: faInfo,
    };

    colorMap = {
        [ToastTypes.Success]: "bg-green-400",
        [ToastTypes.Warning]: "bg-yellow-400",
        [ToastTypes.Danger]: "bg-red-400",
        [ToastTypes.Info]: "bg-blue-400",
    };

    isVisible: boolean = false;

    constructor() {}

    ngOnInit() {
        this.autohideToast();
    }

    get icon() {
        return this.iconMap[this.type];
    }

    get color() {
        return this.colorMap[this.type];
    }

    autohideToast() {
        this.isVisible = true;

        if (this.duration < 0) return;

        setTimeout(() => {
            this.hideToast();
        }, this.duration);
    }

    hideToast() {
        this.isVisible = false;
        this.toastClosed.emit();
    }

    activateButton() {
        this.buttonClicked.emit();
    }
}
