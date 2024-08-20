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
            // {
            //     id: 'ho-so-nhan-su',
            //     title: 'Hồ sơ nhân sự',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/ho-so-nhan-su'
            // },
            // {
            //     id: 'hop-dong-lao-dong',
            //     title: 'Hợp đồng lao động',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/hop-dong-lao-dong'
            // },
            // {
            //     id: 'bang-luong-dinh-ky',
            //     title: 'Bảng lương định kỳ',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/bang-luong-dinh-ky'
            // },
            {
                id: 'cham-cong-diem-danh',
                title: 'Chấm công, điểm danh',
                type: 'collapsable',
                children: [
                    {
                        id: 'cham-cong-thu-cong',
                        title: 'Bảng Chấm công/Điểm danh',
                        type: 'basic',
                        link: '/cham-cong-diem-danh'
                    },
                    {
                        id: 'cham-cong-thu-cong',
                        title: 'Điểm danh thủ công',
                        type: 'basic',
                        link: '/diem-danh-thu-cong'
                    }
                ]
            },
            {
                id: 'xac-nhan-cham-cong',
                title: 'Xác nhận chấm công',
                type: 'basic',
                link: '/xac-nhan-cham-cong'
            },
            {
                id: 'bang-cham-cong',
                title: 'Tổng hợp chấm công',
                type: 'basic',
                link: '/bang-cham-cong'
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
    // {
    //     id: 'bao-cao',
    //     title: 'Tổng hợp, báo cáo',
    //     type: 'group',
    //     icon: 'mat_outline:arrow_drop_down',
    //     children: [
    //         {
    //             id: 'bao-cao-nhan-su',
    //             title: 'Báo cáo nhân sự',
    //             type: 'basic',
    //             icon: 'mat_outline:arrow_drop_down',
    //             link: '/bao-cao-nhan-su'
    //         }
    //     ]
    // },
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
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
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
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
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
        id: 'permission',
        title: 'Phân quyền người dùng',
        type: 'group',
        icon: 'mat_outline:arrow_drop_down',
        children: [
            {
                id: 'function1',
                title: 'API endpoints',
                type: 'basic',
                icon: '',
                link: '/endpoints',
                hidden(item) {
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            },
            {
                id: 'function2',
                title: 'Chức năng',
                type: 'basic',
                icon: '',
                link: '/functions',
                hidden(item) {
                    // always hide this item if role is not SSA
                    if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
                        return true;
                    }
                    return false;
                },
            },
            // {
            //     id: 'function3',
            //     title: 'Nhóm chức năng',
            //     type: 'basic',
            //     icon: '',
            //     link: '/group-functions',
            //     hidden(item) {
            //         // always hide this item if role is not SSA
            //         if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
            //             return true;
            //         }
            //         return false;
            //     },
            // },
            // {
            //     id: 'function4',
            //     title: 'Phạm vi chức năng',
            //     type: 'basic',
            //     icon: '',
            //     link: '/scopes',
            //     hidden(item) {
            //         // always hide this item if role is not SSA
            //         if (localStorage.getItem('role') !== Constants.ROLE_SSA) {
            //             return true;
            //         }
            //         return false;
            //     },
            // },
            {
                id: 'system-role',
                title: 'Vai trò hệ thống',
                type: 'basic',
                icon: 'mat_solid:verified_user',
                link: '/system-role',
                hidden(item) {
                    if (!isAllowSetPermission(localStorage.getItem('role'))) {
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
            {
                id: 'user-role',
                title: 'Gán vai trò cho người dùng',
                type: 'basic',
                icon: 'mat_solid:verified_user',
                link: '/user-role',
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
                hidden(item) {
                    return false;
                },
            },
            {
                id: 'chi-nhanh',
                title: 'Chi nhánh/Văn phòng',
                type: 'basic',
                link: '/chi-nhanh',
                hidden(item) {
                    return false;
                },
            },
            {
                id: 'phong-ban-bo-phan',
                title: 'Phòng/Ban/Bộ phận',
                type: 'basic',
                link: '/phong-ban-bo-phan'
            },
            // {
            //     id: 'khu-vuc-chuyen-mon',
            //     title: 'Khu vực/Chuyên môn',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/khu-vuc-chuyen-mon'
            // },
            // {
            //     id: 'phan-loai-nhan-su',
            //     title: 'Phân loại nhân sự',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/phan-loai-nhan-su'
            // },
            // {
            //     id: 'chuc-danh',
            //     title: 'Chức danh',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/chuc-danh'
            // },
            // {
            //     id: 'vai-tro',
            //     title: 'Vai trò',
            //     type: 'basic',
            //     link: '/vai-tro'
            // },
            // {
            //     id: 'vi-tri-cong-viec',
            //     title: 'Vị trí công việc',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/vi-tri-cong-viec'
            // },
            // {
            //     id: 'tham-so-luong',
            //     title: 'Tham số lương',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/tham-so-luong'
            // },
            // {
            //     id: 'cong-thuc-luong',
            //     title: 'Chính sách/Công thức lương',
            //     type: 'basic',
            //     icon: 'mat_outline:arrow_drop_down',
            //     link: '/cong-thuc-luong'
            // },
            {
                id: 'thiet-lap-cham-cong',
                title: 'Thiết lập chấm công',
                type: 'basic',
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
        title: 'Quản lý nhân sự',
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
    // {
    //     id: 'bao-cao',
    //     title: 'Tổng hợp, báo cáo',
    //     type: 'group',
    //     icon: 'mat_outline:arrow_drop_down',
    //     children: [
    //     ]
    // },
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
        link: 'http://poi.vn:1124/',
        externalLink: true,
        target: "_blank"
    },
    {
        id: 'prj',
        title: 'Hệ thống thông tin công việc',
        type: 'basic',
        icon: 'mat_outline:task',
        link: 'http://poi.vn:1123/',
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

export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];