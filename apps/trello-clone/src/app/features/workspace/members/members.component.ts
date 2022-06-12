import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChipColors, Icons, Paragraph} from "@ui-components";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit {
  membersParagraph!: Paragraph;
  inviteParagraph!: Paragraph;

  ngOnInit(): void {
    this.initMembersParagraph();
    this.initInviteParagraph();
  }

  private initMembersParagraph() {
    this.membersParagraph = {
      title: 'Workspace members (1)',
      text: 'Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.',
      dividerBottom: true,
    };
  }

  private initInviteParagraph() {
    this.inviteParagraph = {
      title: 'Invite members to join you',
      text: `Anyone with a unique link can join this Workspace,
              with 1 board. You’ll be billed for each member added.
              You can disable, and create a new link for this Workspace at any time.`,
      dividerBottom: true,
      textLink: {
        text: 'Invite with link',
        icon: Icons.PaperClip,
        className: 'btn',
        action: () => {
          this.initChipConfig()
        }
      }
    };
  }

  private initChipConfig() {
    this.inviteParagraph = {
      ...this.inviteParagraph,
      chipConfig: {
        icon: 'pi pi-check',
        label: 'Link has been copied to clipboard',
        removable: false,
        color: ChipColors.Success,
        timeOut: 2
      }
    };
  }
}
