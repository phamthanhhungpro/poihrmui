/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Constants } from '../constants';
import { isAllowSetPermission } from '../user/roleHelper';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'ho-so',
        title: 'Quản lý nhân sự',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
            {
                id: 'ho-so-nhan-su',
                title: 'Hồ sơ nhân sự',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/ho-so-nhan-su'
            },
            {
                id: 'hop-dong-lao-dong',
                title: 'Hợp đồng lao động',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/hop-dong-lao-dong'
            },
            {
                id: 'bang-luong-dinh-ky',
                title: 'Bảng lương định kỳ',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/bang-luong-dinh-ky'
            },
            {
                id: 'cham-cong-diem-danh',
                title: 'Chấm công, điểm danh',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/cham-cong-diem-danh'
            },
            {
                id: 'xac-nhan-cham-cong',
                title: 'Xác nhận chấm công',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/xac-nhan-cham-cong'
            }
        ]
    },
    {
        id: 'id',
        title: 'Thành viên',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
            {
                id: 'user',
                title: 'Thành viên',
                type: 'basic',
                icon: 'mat_outline:manage_accounts',
                link: '/user'
            },
        ]
    },
    {
        id: 'bao-cao',
        title: 'Tổng hợp, báo cáo',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
            {
                id: 'bao-cao-nhan-su',
                title: 'Báo cáo nhân sự',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/bao-cao-nhan-su'
            }
        ]
    },
    {
        id: 'permission',
        title: 'Phân quyền người dùng',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
            {
                id: 'function',
                title: 'Chức năng',
                type: 'basic',
                icon: 'mat_solid:functions',
                link: '/function',
                hidden(item) {
                    // always hide this item if role is not SSA, OWNER
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA && localStorage.getItem('role') !== Constants.ROLE_OWNER) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'function',
                title: 'Nhóm chức năng',
                type: 'basic',
                icon: 'mat_solid:functions',
                link: '/nhom-chuc-nang',
                hidden(item) {
                    // always hide this item if role is not SSA OWNER
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA && localStorage.getItem('role') !== Constants.ROLE_OWNER) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'assign-permission',
                title: 'Phân quyền chức năng',
                type: 'basic',
                icon: 'mat_solid:verified_user',
                link: '/permission',
                hidden(item) {
                    if (!isAllowSetPermission(localStorage.getItem('role'))) {
                        return true;
                    }
                    return false;
                },
            },

        ]
    },
    {
        id: 'cai-dat',
        title: 'Cài đặt',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
            {
                id: 'don-vi',
                title: 'Thông tin Cơ quan - Đơn vị',
                type: 'basic',
                link: '/don-vi',
                icon: 'mat_outline:arrow_forward',
                hidden(item) {
                    return false;
                },
            },
            {
                id: 'chi-nhanh',
                title: 'Chi nhánh/Văn phòng',
                type: 'basic',
                link: '/chi-nhanh',
                icon: 'mat_outline:arrow_forward',
                hidden(item) {
                    return false;
                },
            },
            {
                id: 'phong-ban-bo-phan',
                title: 'Phòng/Ban/Bộ phận',
                type: 'basic',
                icon: 'mat_outline:arrow_forward',
                link: '/phong-ban-bo-phan'
            },
            {
                id: 'khu-vuc-chuyen-mon',
                title: 'Khu vực/Chuyên môn',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/khu-vuc-chuyen-mon'
            },
            {
                id: 'phan-loai-nhan-su',
                title: 'Phân loại nhân sự',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/phan-loai-nhan-su'
            },
            {
                id: 'chuc-danh',
                title: 'Chức danh',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/chuc-danh'
            },
            {
                id: 'vai-tro',
                title: 'Vai trò',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/vai-tro'
            },
            {
                id: 'vi-tri-cong-viec',
                title: 'Vị trí công việc',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/vi-tri-cong-viec'
            },
            {
                id: 'tham-so-luong',
                title: 'Tham số lương',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/tham-so-luong'
            },
            {
                id: 'cong-thuc-luong',
                title: 'Chính sách/Công thức lương',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/cong-thuc-luong'
            },
            {
                id: 'thiet-lap-cham-cong',
                title: 'Thiết lập chấm công',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/thiet-lap-cham-cong'
            },
        ]
    },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'ho-so',
        title: 'Hồ sơ nhân sự',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [

        ]
    },
    {
        id: 'id',
        title: 'Thành viên',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [

        ]
    },
    {
        id: 'bao-cao',
        title: 'Tổng hợp, báo cáo',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
        ]
    },
    {
        id: 'permission',
        title: 'Phân quyền người dùng',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [

        ]
    },
    {
        id: 'cai-dat',
        title: 'Cài đặt',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
        ]
    },
];

export const firstNavigation: FuseNavigationItem[] = [
    {
        id: 'hrm',
        title: 'Hệ thống thông tin nhân sự',
        type: 'basic',
        icon: 'mat_outline:psychology',
        link: 'https://hrm.poi.vn/',
        externalLink: true,
        target: "_blank"
    },
    {
        id: 'prj',
        title: 'Hệ thống thông tin công việc',
        type: 'basic',
        icon: 'mat_outline:task',
        link: 'https://prj.poi.vn/',
        externalLink: true,
        target: "_blank"
    },
    {
        id: 'checkin',
        title: 'Hệ thống thông tin điểm danh',
        type: 'basic',
        icon: 'mat_outline:emoji_people',
        link: 'https://io.poi.vn/',
        externalLink: true,
        target: "_blank"
    }
];
