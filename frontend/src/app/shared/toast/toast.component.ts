// basic
import { Component, EventEmitter, Input, Output } from "@angular/core";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCheck, faExclamation, faBan, faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";

// enums
import { ToastType } from "./toast.enums";

@Component({
    selector: "shared-toast",
    imports: [FontAwesomeModule],
    templateUrl: "./toast.component.html",
    styleUrl: "./toast.component.css",
})
export class ToastComponent {
    @Input() type: ToastType;
    @Input() message: string;
    @Input() duration: number;
    @Input() button: string;
    @Output() toastClosed = new EventEmitter<void>();
    @Output() buttonClicked = new EventEmitter<void>();

    closeIcon = faXmark;

    iconMap = {
        [ToastType.Success]: faCheck,
        [ToastType.Warning]: faExclamation,
        [ToastType.Danger]: faBan,
        [ToastType.Info]: faInfo,
    };

    colorMap = {
        [ToastType.Success]: "bg-green-400",
        [ToastType.Warning]: "bg-yellow-400",
        [ToastType.Danger]: "bg-red-400",
        [ToastType.Info]: "bg-blue-400",
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
