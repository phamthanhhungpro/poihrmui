/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { Constants } from '../constants';
import { isAllowSetPermission } from '../user/roleHelper';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'ho-so',
        title: 'Quản lý nhân sự',
        type: 'group',
        icon: 'heroicons_outline:home',
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
            }
        ]
    },
    {
        id: 'bao-cao',
        title: 'Tổng hợp, báo cáo',
        type: 'group',
        icon: 'heroicons_outline:home',
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
        id: 'cai-dat',
        title: 'Cài đặt',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'thong-tin-co-quan-don-vi',
                title: 'Thông tin cơ quan đơn vị',
                type: 'basic',
                icon: 'mat_outline:arrow_drop_down',
                link: '/thong-tin-co-quan-don-vi'
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
        icon: 'heroicons_outline:home',
        children: [

        ]
    },
    {
        id: 'bao-cao',
        title: 'Tổng hợp, báo cáo',
        type: 'group',
        icon: 'heroicons_outline:home',
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
        link: 'hrm'
    },
    {
        id: 'prj',
        title: 'Hệ thống thông tin công việc',
        type: 'basic',
        icon: 'mat_outline:task',
        link: 'prj'
    },
    {
        id: 'checkin',
        title: 'Hệ thống thông tin điểm danh',
        type: 'basic',
        icon: 'mat_outline:emoji_people',
        link: 'checkin'
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
