// src/data/configuratorData.ts

export interface Part {
	id: string;
	name: string;
	imageUrl: string;
	priceModifier: number;
}

export interface EngravingOption {
	price: number;
	maxLength: number;
}

export interface WatchModel {
	id: string;
	name: string;
	basePrice: number;
	baseImageUrl: string;
	options: {
		braslet?: Part[];
		models?: Part[];
		bezels?: Part[];
		dials?: Part[];
		cases?: Part[];
		date_windows?: Part[];
		main_arrows?: Part[];
		second_arrows?: Part[];
		gmt_arrows?: Part[];
		subdial_arrows?: Part[];
		logos?: Part[];
		engraving?: EngravingOption;
	};
}

export const models: WatchModel[] = [
	// Nautiko NH35
	{
		id: "nautiko_nh35",
		name: "Nautiko NH35",
		basePrice: 150000,
		baseImageUrl: "/configurator/Nautiko_NH35/base.png",
		options: {
			braslet: [
				{
					id: "braslet_leather_black",
					name: "Leather Black",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Leather_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_leather_blue",
					name: "Leather Blue",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Leather_Blue.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_leather_brown",
					name: "Leather Brown",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Leather_Brown.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_rubber_black",
					name: "Rubber Black",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Rubber_Black.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_rubber_blue",
					name: "Rubber Blue",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Rubber_Blue.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_rubber_brown",
					name: "Rubber Brown",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Rubber_Brown.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_rubber_green",
					name: "Rubber Green",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Rubber_Green.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_steel_black",
					name: "Steel Black",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Steel_Black.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_steel_rose_gold",
					name: "Steel Rose Gold",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Steel_Rose_Gold.png",
					priceModifier: 20000,
				},
				{
					id: "braslet_steel_silver",
					name: "Steel Silver",
					imageUrl: "/configurator/Nautiko_NH35/Браслет/Steel_Silver.png",
					priceModifier: 20000,
				},
			],
			dials: [
				{
					id: "dial_black_open",
					name: "Black Open",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Black_Open.png",
					priceModifier: 0,
				},
				{
					id: "dial_black",
					name: "Black",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue_open",
					name: "Blue Open",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Blue_Open.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue",
					name: "Blue",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Blue.png",
					priceModifier: 0,
				},
				{
					id: "dial_brown",
					name: "Brown",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Brown.png",
					priceModifier: 0,
				},
				{
					id: "dial_green_open",
					name: "Green Open",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Green_Open.png",
					priceModifier: 0,
				},
				{
					id: "dial_green",
					name: "Green",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Green.png",
					priceModifier: 0,
				},
				{
					id: "dial_grey",
					name: "Grey",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/Grey.png",
					priceModifier: 0,
				},
				{
					id: "dial_white",
					name: "White",
					imageUrl: "/configurator/Nautiko_NH35/Циферблат/White.png",
					priceModifier: 0,
				},
			],
			cases: [
				{
					id: "case_black",
					name: "Black",
					imageUrl: "/configurator/Nautiko_NH35/Корпус/Black.png",
					priceModifier: 0,
				},
				{
					id: "case_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Nautiko_NH35/Корпус/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Nautiko_NH35/Корпус/Silver.png",
					priceModifier: 0,
				},
			],
			main_arrows: [
				{
					id: "main_arrow_black",
					name: "Black",
					imageUrl: "/configurator/Nautiko_NH35/Стрелки/Black.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Nautiko_NH35/Стрелки/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_silver",
					name: "Silver",
					imageUrl: "/configurator/Nautiko_NH35/Стрелки/Silver.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Nautiko_NH35/Стрелки/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			second_arrows: [
				{
					id: "second_arrow_black",
					name: "Black",
					imageUrl: "/configurator/Nautiko_NH35/Секундная_стрелка/Black.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_rose_gold",
					name: "Rose Gold",
					imageUrl:
						"/configurator/Nautiko_NH35/Секундная_стрелка/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_silver",
					name: "Silver",
					imageUrl: "/configurator/Nautiko_NH35/Секундная_стрелка/Silver.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_yellow_gold",
					name: "Yellow Gold",
					imageUrl:
						"/configurator/Nautiko_NH35/Секундная_стрелка/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			engraving: { price: 15000, maxLength: 20 },
		},
	},

	// Santeiko NH35
	{
		id: "santeiko_nh35",
		name: "Santeiko NH35",
		basePrice: 150000,
		baseImageUrl: "/configurator/Santeiko_NH35/base.png",
		options: {
			braslet: [
				{
					id: "braslet_silver",
					name: "Silver",
					imageUrl: "/configurator/Santeiko_NH35/Браслет/Silver.png",
					priceModifier: 0,
				},
				{
					id: "braslet_silver_gold",
					name: "Silver Gold",
					imageUrl: "/configurator/Santeiko_NH35/Браслет/Silver_Gold.png",
					priceModifier: 0,
				},
			],
			dials: [
				{
					id: "dial_black",
					name: "Black",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue",
					name: "Blue",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/Blue.png",
					priceModifier: 0,
				},
				{
					id: "dial_brown",
					name: "Brown",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/Brown.png",
					priceModifier: 0,
				},
				{
					id: "dial_fuck_9_5",
					name: "Fuck 9 5",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/Fuck_9_5.png",
					priceModifier: 0,
				},
				{
					id: "dial_green",
					name: "Green",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/Green.png",
					priceModifier: 0,
				},
				{
					id: "dial_ice",
					name: "Ice",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/Ice.png",
					priceModifier: 0,
				},
				{
					id: "dial_skeleton",
					name: "Skeleton",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/Skeleton.png",
					priceModifier: 0,
				},
				{
					id: "dial_white",
					name: "White",
					imageUrl: "/configurator/Santeiko_NH35/Циферблат/White.png",
					priceModifier: 0,
				},
			],
			cases: [
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Santeiko_NH35/Корпус/Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_silver_gold",
					name: "Silver Gold",
					imageUrl: "/configurator/Santeiko_NH35/Корпус/Silver_Gold.png",
					priceModifier: 0,
				},
			],
			main_arrows: [
				{
					id: "main_arrow_black",
					name: "Black",
					imageUrl: "/configurator/Santeiko_NH35/Стрелки/Black.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_blue",
					name: "Blue",
					imageUrl: "/configurator/Santeiko_NH35/Стрелки/Blue.png",
					priceModifier: 0,
				},
			],
			second_arrows: [
				{
					id: "main_arrow_black",
					name: "Black",
					imageUrl: "/configurator/Santeiko_NH35/Секундная_стрелка/Black.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_blue",
					name: "Blue",
					imageUrl: "/configurator/Santeiko_NH35/Секундная_стрелка/Blue.png",
					priceModifier: 0,
				},
			],
			engraving: { price: 15000, maxLength: 20 },
		},
	},

	// Seikoak NH35
	{
		id: "seikoak_nh35",
		name: "Seikoak NH35",
		basePrice: 150000,
		baseImageUrl: "/configurator/Seikoak_NH35/base.png",
		options: {
			dials: [
				{
					id: "dial_black_chrono",
					name: "Black Chrono",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Black_Chrono.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_rose_gold",
					name: "Black Rose Gold",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Black_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_yellow_gold",
					name: "Black Yellow Gold",
					imageUrl:
						"/configurator/Seikoak_NH35/Циферблат/Black_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_black",
					name: "Black",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue_chrono",
					name: "Blue Chrono",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Blue_Chrono.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue_rose_gold",
					name: "Blue Rose Gold",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Blue_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue",
					name: "Blue",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Blue.png",
					priceModifier: 0,
				},
				{
					id: "dial_green_chrono",
					name: "Green Chrono",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Green_Chrono.png",
					priceModifier: 0,
				},
				{
					id: "dial_green_rose_gold",
					name: "Green Rose Gold",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Green_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_green",
					name: "Green",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Green.png",
					priceModifier: 0,
				},
				{
					id: "dial_ice_blue",
					name: "Ice Blue",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Ice_Blue.png",
					priceModifier: 0,
				},
				{
					id: "dial_panda_chrono",
					name: "Panda Chrono",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Panda_Chrono.png",
					priceModifier: 0,
				},
				{
					id: "dial_skeleton",
					name: "Skeleton",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/Skeleton.png",
					priceModifier: 0,
				},
				{
					id: "dial_white_rose_gold",
					name: "White Rose Gold",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/White_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_white",
					name: "White",
					imageUrl: "/configurator/Seikoak_NH35/Циферблат/White.png",
					priceModifier: 0,
				},
			],
			cases: [
				{
					id: "case_black",
					name: "Black",
					imageUrl: "/configurator/Seikoak_NH35/Корпус/Black.png",
					priceModifier: 0,
				},
				{
					id: "case_chrono_black",
					name: "Chrono Black",
					imageUrl: "/configurator/Seikoak_NH35/Корпус/Chrono_Black.png",
					priceModifier: 0,
				},
				{
					id: "case_chrono_silver",
					name: "Chrono Silver",
					imageUrl: "/configurator/Seikoak_NH35/Корпус/Chrono_Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikoak_NH35/Корпус/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikoak_NH35/Корпус/Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seikoak_NH35/Корпус/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			main_arrows: [
				{
					id: "main_arrow_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikoak_NH35/Стрелки/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikoak_NH35/Стрелки/Silver.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seikoak_NH35/Стрелки/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			second_arrows: [
				{
					id: "main_arrow_rose_gold",
					name: "Rose Gold",
					imageUrl:
						"/configurator/Seikoak_NH35/Секундная_стрелка/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikoak_NH35/Секундная_стрелка/Silver.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_yellow_gold",
					name: "Yellow Gold",
					imageUrl:
						"/configurator/Seikoak_NH35/Секундная_стрелка/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			engraving: { price: 15000, maxLength: 20 },
		},
	},

	// Seikojust_NH35
	{
		id: "seikojust_nh35",
		name: "Seikojust NH35",
		basePrice: 150000,
		baseImageUrl: "/configurator/Seikojust_NH35/base.png",
		options: {
			braslet: [
				{
					id: "braslet_black_jubilee",
					name: "Black Jubilee",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Black_Jubilee.png",
					priceModifier: 0,
				},
				{
					id: "braslet_black_oyster",
					name: "Black Oyster",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Black_Oyster.png",
					priceModifier: 0,
				},
				{
					id: "braslet_black_rubber",
					name: "Black Rubber",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Black_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_brown_rubber",
					name: "Brown Rubber",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Brown_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_green_rubber",
					name: "Green Rubber",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Green_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee_rose_gold",
					name: "Jubilee Rose Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/Jubilee_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee_silver_rose_gold",
					name: "Jubilee Silver Rose Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/Jubilee_Silver_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee_silver_yellow_gold",
					name: "Jubilee Silver Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/Jubilee_Silver_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee_yellow_gold",
					name: "Jubilee Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/Jubilee_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee",
					name: "Jubilee",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Jubilee.png",
					priceModifier: 0,
				},
				{
					id: "braslet_leather",
					name: "Leather",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Leather.png",
					priceModifier: 0,
				},
				{
					id: "braslet_orange_rubber",
					name: "Orange Rubber",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Orange_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_rose_gold",
					name: "Oyster Rose Gold",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Oyster_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_silver_rose_gold",
					name: "Oyster Silver Rose Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/Oyster_Silver_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_silver_yellow_gold",
					name: "Oyster Silver Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/Oyster_Silver_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_yellow_gold",
					name: "Oyster Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/Oyster_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster",
					name: "Oyster",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Oyster.png",
					priceModifier: 0,
				},
				{
					id: "braslet_president_black",
					name: "President Black",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/President_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_president_rose_gold",
					name: "President Rose Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/President_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_president_yellow_gold",
					name: "President Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Браслет/President_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_president",
					name: "President",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/President.png",
					priceModifier: 0,
				},
				{
					id: "braslet_red_rubber",
					name: "Red Rubber",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Red_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_white_rubber",
					name: "White Rubber",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/White_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_yellow_rubber",
					name: "Yellow Rubber",
					imageUrl: "/configurator/Seikojust_NH35/Браслет/Yellow_Rubber.png",
					priceModifier: 0,
				},
			],
			dials: [
				{
					id: "dial_ace",
					name: "Ace",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Ace.png",
					priceModifier: 0,
				},
				{
					id: "dial_arabic_special_black",
					name: "Arabic Special Black",
					imageUrl:
						"/configurator/Seikojust_NH35/Циферблат/Arabic_Special_Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_circle",
					name: "Black Circle",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Black_Circle.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_rose_gold",
					name: "Black Rose Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Циферблат/Black_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_yellow_gold",
					name: "Black Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Циферблат/Black_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue_yellow_gold",
					name: "Blue Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Циферблат/Blue_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue",
					name: "Blue",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Blue.png",
					priceModifier: 0,
				},
				{
					id: "dial_champagne_triangle",
					name: "Champagne Triangle",
					imageUrl:
						"/configurator/Seikojust_NH35/Циферблат/Champagne_Triangle.png",
					priceModifier: 0,
				},
				{
					id: "dial_classic_black",
					name: "Classic Black",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Classic_Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_classic_grey",
					name: "Classic Grey",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Classic_Grey.png",
					priceModifier: 0,
				},
				{
					id: "dial_green_numbers",
					name: "Green Numbers",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Green_Numbers.png",
					priceModifier: 0,
				},
				{
					id: "dial_line_black",
					name: "Line Black",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Line_Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_magenta",
					name: "Magenta",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Magenta.png",
					priceModifier: 0,
				},
				{
					id: "dial_olive_green",
					name: "Olive Green",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Olive_Green.png",
					priceModifier: 0,
				},
				{
					id: "dial_orange_circle",
					name: "Orange Circle",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Orange_Circle.png",
					priceModifier: 0,
				},
				{
					id: "dial_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Silver.png",
					priceModifier: 0,
				},
				{
					id: "dial_special_silver",
					name: "Special Silver",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Special_Silver.png",
					priceModifier: 0,
				},
				{
					id: "dial_turquoise_circle",
					name: "Turquoise Circle",
					imageUrl:
						"/configurator/Seikojust_NH35/Циферблат/Turquoise_Circle.png",
					priceModifier: 0,
				},
				{
					id: "dial_white_numbers",
					name: "White Numbers",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/White_Numbers.png",
					priceModifier: 0,
				},
				{
					id: "dial_wimbledon_silver",
					name: "Wimbledon Silver",
					imageUrl:
						"/configurator/Seikojust_NH35/Циферблат/Wimbledon_Silver.png",
					priceModifier: 0,
				},
				{
					id: "dial_wimbledon",
					name: "Wimbledon",
					imageUrl: "/configurator/Seikojust_NH35/Циферблат/Wimbledon.png",
					priceModifier: 0,
				},
			],
			cases: [
				{
					id: "case_black",
					name: "Black",
					imageUrl: "/configurator/Seikojust_NH35/Корпус/Black.png",
					priceModifier: 0,
				},
				{
					id: "case_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikojust_NH35/Корпус/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_silver_rose_gold",
					name: "Silver Rose Gold",
					imageUrl: "/configurator/Seikojust_NH35/Корпус/Silver_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_silver_yellow_gold",
					name: "Silver Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Корпус/Silver_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikojust_NH35/Корпус/Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seikojust_NH35/Корпус/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			main_arrows: [
				{
					id: "main_arrow_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikojust_NH35/Стрелки/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikojust_NH35/Стрелки/Silver.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seikojust_NH35/Стрелки/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			second_arrows: [
				{
					id: "main_arrow_lightning_red",
					name: "Lightning Red",
					imageUrl:
						"/configurator/Seikojust_NH35/Секундная_стрелка/Lightning_Red.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_lightning_silver",
					name: "Lightning Silver",
					imageUrl:
						"/configurator/Seikojust_NH35/Секундная_стрелка/Lightning_Silver.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_lightning_yellow",
					name: "Lightning Yellow",
					imageUrl:
						"/configurator/Seikojust_NH35/Секундная_стрелка/Lightning_Yellow.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_line_or_rose",
					name: "Line or Rose",
					imageUrl:
						"/configurator/Seikojust_NH35/Секундная_стрелка/Line_Or_Rose.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_line_silver",
					name: "Line Silver",
					imageUrl:
						"/configurator/Seikojust_NH35/Секундная_стрелка/Line_Silver.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_line_yellow_gold",
					name: "Line Yellow Gold",
					imageUrl:
						"/configurator/Seikojust_NH35/Секундная_стрелка/Line_Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			date_windows: [
				{
					id: "data_without_magnifier",
					name: "Without Magnifier",
					imageUrl: "/configurator/Seikojust_NH35/Дата/Without_magnifier.png",
					priceModifier: 0,
				},
				{
					id: "data_with_magnifier",
					name: "With Magnifier",
					imageUrl: "/configurator/Seikojust_NH35/Дата/With_magnifier.png",
					priceModifier: 0,
				},
			],
			engraving: { price: 15000, maxLength: 20 },
		},
	},

	// Seikomariner_NH35
	{
		id: "Seikomariner_nh35",
		name: "Seikomariner NH35",
		basePrice: 150000,
		baseImageUrl: "/configurator/Seikomariner_NH35/base.png",
		options: {
			braslet: [
				{
					id: "braslet_black_rubber",
					name: "Black Rubber",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Black_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_brown_rubber",
					name: "Brown Rubber",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Brown_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_green_rubber",
					name: "Green Rubber",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Green_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee_black",
					name: "Jubilee Black",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Jubilee_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee_gold",
					name: "Jubilee Gold",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Jubilee_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee_Rose_Gold",
					name: "Jubilee Rose Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Браслет/Jubilee_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_jubilee",
					name: "Jubilee",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Jubilee.png",
					priceModifier: 0,
				},
				{
					id: "braslet_orange_rubber",
					name: "Orange Rubber",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Orange_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_black",
					name: "Oyster Black",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Oyster_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_gold",
					name: "Oyster Gold",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Oyster_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_matt",
					name: "Oyster Matt",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Oyster_Matt.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_polished",
					name: "Oyster Polished",
					imageUrl:
						"/configurator/Seikomariner_NH35/Браслет/Oyster_Polished.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_rose_gold",
					name: "Oyster Rose Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Браслет/Oyster_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_red_rubber",
					name: "Red Rubber",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Red_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_silver_rose_gold",
					name: "Silver Rose Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Браслет/Silver_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_silver_yellow_gold",
					name: "Silver Yellow Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Браслет/Silver_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "braslet_white_rubber",
					name: "White Rubber",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/White_Rubber.png",
					priceModifier: 0,
				},
				{
					id: "braslet_yellow_rubber",
					name: "Yellow Rubber",
					imageUrl: "/configurator/Seikomariner_NH35/Браслет/Yellow_Rubber.png",
					priceModifier: 0,
				},
			],
			dials: [
				{
					id: "dial_arabic_black",
					name: "Arabic Black",
					imageUrl:
						"/configurator/Seikomariner_NH35/Циферблат/Arabic_Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_rose_gold",
					name: "Black Rose Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Циферблат/Black_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_yellow_gold",
					name: "Black Yellow Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Циферблат/Black_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue_midnight",
					name: "Blue Midnight",
					imageUrl:
						"/configurator/Seikomariner_NH35/Циферблат/Blue_Midnight.png",
					priceModifier: 0,
				},
				{
					id: "dial_bronze",
					name: "Bronze",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Bronze.png",
					priceModifier: 0,
				},
				{
					id: "dial_dark_grey",
					name: "Dark Grey",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Dark_Grey.png",
					priceModifier: 0,
				},
				{
					id: "dial_green",
					name: "Green",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Green.png",
					priceModifier: 0,
				},
				{
					id: "dial_grey",
					name: "Grey",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Grey.png",
					priceModifier: 0,
				},
				{
					id: "dial_magenta",
					name: "Magenta",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Magenta.png",
					priceModifier: 0,
				},
				{
					id: "dial_olive",
					name: "Olive",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Olive.png",
					priceModifier: 0,
				},
				{
					id: "dial_orange",
					name: "Orange",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Orange.png",
					priceModifier: 0,
				},
				{
					id: "dial_pink",
					name: "Pink",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Pink.png",
					priceModifier: 0,
				},
				{
					id: "dial_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Silver.png",
					priceModifier: 0,
				},
				{
					id: "dial_skeleton_black",
					name: "Skeleton Black",
					imageUrl:
						"/configurator/Seikomariner_NH35/Циферблат/Skeleton_Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_skeleton_silver",
					name: "Skeleton Silver",
					imageUrl:
						"/configurator/Seikomariner_NH35/Циферблат/Skeleton_Silver.png",
					priceModifier: 0,
				},
				{
					id: "dial_tiffany_blue",
					name: "Tiffany Blue",
					imageUrl:
						"/configurator/Seikomariner_NH35/Циферблат/Tiffany_Blue.png",
					priceModifier: 0,
				},
				{
					id: "dial_wimbledon",
					name: "Wimbledon",
					imageUrl: "/configurator/Seikomariner_NH35/Циферблат/Wimbledon.png",
					priceModifier: 0,
				},
			],
			cases: [
				{
					id: "case_brushed_black",
					name: "Brushed Black",
					imageUrl: "/configurator/Seikomariner_NH35/Корпус/Brushed_Black.png",
					priceModifier: 0,
				},
				{
					id: "case_brushed_rose_gold",
					name: "Brushed Rose Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Корпус/Brushed_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_brushed_silver_rose_gold",
					name: "Brushed Silver Rose Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Корпус/Brushed_Silver_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_brushed_silver_yellow_gold",
					name: "Brushed Silver Yellow Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Корпус/Brushed_Silver_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow_gold",
					name: "Brushed Yellow Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Корпус/Brushed_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_silver",
					name: "Brushed Silver",
					imageUrl: "/configurator/Seikomariner_NH35/Корпус/Brushed_Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_polished_rose_gold",
					name: "Polished Rose Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/Корпус/Polished_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_polished_silver",
					name: "Polished Silver",
					imageUrl:
						"/configurator/Seikomariner_NH35/Корпус/Polished_Silver.png",
					priceModifier: 0,
				},
			],
			main_arrows: [
				{
					id: "main_arrow_black_datejust",
					name: "Black Datejust",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Black_Datejust.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_black_nautilus",
					name: "Black Nautilus",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Black_Nautilus.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_blue_mercedes",
					name: "Blue Mercedes",
					imageUrl: "/configurator/Seikomariner_NH35/Стрелки/Blue_Mercedes.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_classic_silver",
					name: "Classic Silver",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Classic_Silver.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_green_mercedes",
					name: "Green Mercedes",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Green_Mercedes.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_orange_mercedes",
					name: "Orange Mercedes",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Orange_Mercedes.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_purple_mercedes",
					name: "Purple Mercedes",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Purple_Mercedes.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_red_mercedes",
					name: "Red Mercedes",
					imageUrl: "/configurator/Seikomariner_NH35/Стрелки/Red_Mercedes.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_rose_gold_nautilus",
					name: "Rose Gold Nautilus",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Rose_Gold_Nautilus.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_rose_gold_nautilus",
					name: "Rose Gold Nautilus",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Rose_Gold_Nautilus.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_yellow_gold_datejust",
					name: "Yellow Gold Datejust",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Yellow_Gold_Datejust.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_yellow_gold_mercedes",
					name: "Yellow Gold Mercedes",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Yellow_Gold_Mercedes.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_yellow_gold_nautilus",
					name: "Yellow Gold Nautilus",
					imageUrl:
						"/configurator/Seikomariner_NH35/Стрелки/Yellow_Gold_Nautilus.png",
					priceModifier: 0,
				},
			],
			second_arrows: [
				{
					id: "second_arrow_black_lightning",
					name: "Black Lightning",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Black_Lightning.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_black_line",
					name: "Black Line",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Black_Line.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_blue_lightning",
					name: "Blue Lightning",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Blue_Lightning.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_green_lightning",
					name: "Green Lightning",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Green_Lightning.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_red_lightning",
					name: "Red Lightning",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Red_Lightning.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_yellow_lightning",
					name: "Yellow Lightning",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Yellow_Lightning.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_rose_gold_lightning",
					name: "Rose Gold Lightning",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Rose_Gold_Lightning.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_rose_gold_line",
					name: "Rose Gold Line",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Rose_Gold_Line.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_yellow_gold_lightning",
					name: "Yellow Gold Lightning",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Rose_Gold_Lightning.png",
					priceModifier: 0,
				},
				{
					id: "second_arrow_yellow_gold_line",
					name: "Yellow Gold Line",
					imageUrl:
						"/configurator/Seikomariner_NH35/Секундная_стрелка/Rose_Gold_Line.png",
					priceModifier: 0,
				},
			],
			date_windows: [
				{
					id: "data_without_magnifier",
					name: "Without Magnifier",
					imageUrl:
						"/configurator/Seikomariner_NH35/Дата/Without_magnifier.png",
					priceModifier: 0,
				},
				{
					id: "data_with_magnifier",
					name: "With Magnifier",
					imageUrl: "/configurator/Seikomariner_NH35/Дата/With_magnifier.png",
					priceModifier: 0,
				},
			],
			bezels: [
				{
					id: "bezel_batman",
					name: "Batman",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Batman.png",
					priceModifier: 0,
				},
				{
					id: "bezel_black_arabic",
					name: "Black Arabic",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Black_Arabic.png",
					priceModifier: 0,
				},
				{
					id: "bezel_black_gold",
					name: "Black Gold",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Black_Gold.png",
					priceModifier: 0,
				},
				{
					id: "bezel_black",
					name: "Black",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Black.png",
					priceModifier: 0,
				},
				{
					id: "bezel_blue_3d",
					name: "Blue 3D",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Blue_3D.png",
					priceModifier: 0,
				},
				{
					id: "bezel_blue_gold",
					name: "Blue Gold",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Blue_Gold.png",
					priceModifier: 0,
				},
				{
					id: "bezel_blue_sub",
					name: "Blue Sub",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Blue_Sub.png",
					priceModifier: 0,
				},
				{
					id: "bezel_bruce_wayne",
					name: "Bruce Wayne",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Bruce_Wayne.png",
					priceModifier: 0,
				},
				{
					id: "bezel_coke",
					name: "Coke",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Coke.png",
					priceModifier: 0,
				},
				{
					id: "bezel_gold",
					name: "Gold",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Gold.png",
					priceModifier: 0,
				},
				{
					id: "bezel_green_sub",
					name: "Green Sub",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Green_Sub.png",
					priceModifier: 0,
				},
				{
					id: "bezel_joker_arabic",
					name: "Joker Arabic",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Joker_Arabic.png",
					priceModifier: 0,
				},
				{
					id: "bezel_pepsi",
					name: "Pepsi",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Pepsi.png",
					priceModifier: 0,
				},
				{
					id: "bezel_rootbeer",
					name: "Rootbeer",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Rootbeer.png",
					priceModifier: 0,
				},
				{
					id: "bezel_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "bezel_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Silver.png",
					priceModifier: 0,
				},
				{
					id: "bezel_submariner",
					name: "Submariner",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Submariner.png",
					priceModifier: 0,
				},
				{
					id: "bezel_turquoise",
					name: "Turquoise",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/Turquoise.png",
					priceModifier: 0,
				},
				{
					id: "bezel_white_arabic",
					name: "White Arabic",
					imageUrl: "/configurator/Seikomariner_NH35/Безель/White_Arabic.png",
					priceModifier: 0,
				},
			],
			gmt_arrows: [
				{
					id: "gmt_no_gmt_hand",
					name: "No GMT",
					imageUrl:
						"/configurator/Seikomariner_NH35/GMT_стрелка/No_GMT_hand.png",
					priceModifier: 0,
				},
				{
					id: "gmt_black",
					name: "Black",
					imageUrl: "/configurator/Seikomariner_NH35/GMT_стрелка/Black.png",
					priceModifier: 0,
				},
				{
					id: "gmt_blue",
					name: "Blue",
					imageUrl: "/configurator/Seikomariner_NH35/GMT_стрелка/Blue.png",
					priceModifier: 0,
				},
				{
					id: "gmt_green",
					name: "Green",
					imageUrl: "/configurator/Seikomariner_NH35/GMT_стрелка/Green.png",
					priceModifier: 0,
				},

				{
					id: "gmt_red",
					name: "Red",
					imageUrl: "/configurator/Seikomariner_NH35/GMT_стрелка/Red.png",
					priceModifier: 0,
				},
				{
					id: "gmt_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikomariner_NH35/GMT_стрелка/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "gmt_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikomariner_NH35/GMT_стрелка/Silver.png",
					priceModifier: 0,
				},
				{
					id: "gmt_yellow",
					name: "Yellow",
					imageUrl: "/configurator/Seikomariner_NH35/GMT_стрелка/Yellow.png",
					priceModifier: 0,
				},
				{
					id: "gmt_yellow_gold",
					name: "Yellow Gold",
					imageUrl:
						"/configurator/Seikomariner_NH35/GMT_стрелка/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			engraving: { price: 15000, maxLength: 20 },
		},
	},

	// Seikonaut_NH35
	{
		id: "seikonaut_nh35",
		name: "Seikonaut NH35",
		basePrice: 150000,
		baseImageUrl: "/configurator/Seikonaut_NH35/base.png",
		options: {
			braslet: [
				{
					id: "braslet_black",
					name: "Black",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_brown",
					name: "Brown",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Brown.png",
					priceModifier: 0,
				},
				{
					id: "braslet_green",
					name: "Green",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Green.png",
					priceModifier: 0,
				},
				{
					id: "braslet_orange",
					name: "Orange",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Orange.png",
					priceModifier: 0,
				},
				{
					id: "braslet_red",
					name: "Red",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Red.png",
					priceModifier: 0,
				},
				{
					id: "braslet_royal_blue",
					name: "Royal Blue",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Royal_Blue.png",
					priceModifier: 0,
				},
				{
					id: "braslet_tiffany",
					name: "Tiffany",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Tiffany.png",
					priceModifier: 0,
				},
				{
					id: "braslet_Yellow",
					name: "Yellow",
					imageUrl: "/configurator/Seikonaut_NH35/Браслет/Yellow.png",
					priceModifier: 0,
				},
			],
			dials: [
				{
					id: "braslet_black",
					name: "Black",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_brown",
					name: "Brown",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Brown.png",
					priceModifier: 0,
				},
				{
					id: "braslet_green",
					name: "Green",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Green.png",
					priceModifier: 0,
				},
				{
					id: "braslet_orange",
					name: "Orange",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Orange.png",
					priceModifier: 0,
				},
				{
					id: "braslet_red",
					name: "Red",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Red.png",
					priceModifier: 0,
				},
				{
					id: "braslet_royal_blue",
					name: "Royal Blue",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Royal_Blue.png",
					priceModifier: 0,
				},
				{
					id: "braslet_tiffany",
					name: "Tiffany",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Tiffany.png",
					priceModifier: 0,
				},
				{
					id: "braslet_Yellow",
					name: "Yellow",
					imageUrl: "/configurator/Seikonaut_NH35/Циферблат/Yellow.png",
					priceModifier: 0,
				},
			],
			cases: [
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikonaut_NH35/Корпус/Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikonaut_NH35/Корпус/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seikonaut_NH35/Корпус/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			main_arrows: [
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikonaut_NH35/Стрелки/Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seikonaut_NH35/Стрелки/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seikonaut_NH35/Стрелки/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			second_arrows: [
				{
					id: "case_black",
					name: "Black",
					imageUrl: "/configurator/Seikonaut_NH35/Секундная_стрелка/Black.png",
					priceModifier: 0,
				},
				{
					id: "case_blue",
					name: "Blue",
					imageUrl: "/configurator/Seikonaut_NH35/Секундная_стрелка/Blue.png",
					priceModifier: 0,
				},
				{
					id: "case_orange",
					name: "Orange",
					imageUrl: "/configurator/Seikonaut_NH35/Секундная_стрелка/Orange.png",
					priceModifier: 0,
				},
				{
					id: "case_red",
					name: "Red",
					imageUrl: "/configurator/Seikonaut_NH35/Секундная_стрелка/Red.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow",
					name: "Yellow",
					imageUrl: "/configurator/Seikonaut_NH35/Секундная_стрелка/Yellow.png",
					priceModifier: 0,
				},
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Seikonaut_NH35/Секундная_стрелка/Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_rose_gold",
					name: "Rose Gold",
					imageUrl:
						"/configurator/Seikonaut_NH35/Секундная_стрелка/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow_gold",
					name: "Yellow Gold",
					imageUrl:
						"/configurator/Seikonaut_NH35/Секундная_стрелка/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			engraving: { price: 15000, maxLength: 20 },
		},
	},

	// Seitona_VK63
	{
		id: "seitona_vk63",
		name: "Seitona VK63",
		basePrice: 150000,
		baseImageUrl: "/configurator/Seitona_VK63/base.png",
		options: {
			braslet: [
				{
					id: "braslet_black_black",
					name: "Black / Black",
					imageUrl: "/configurator/Seitona_VK63/Браслет/Black_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_blue_black",
					name: "Blue / Black",
					imageUrl: "/configurator/Seitona_VK63/Браслет/Blue_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_brown_black",
					name: "Brown / Black",
					imageUrl: "/configurator/Seitona_VK63/Браслет/Brown_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_green_black",
					name: "Green / Black",
					imageUrl: "/configurator/Seitona_VK63/Браслет/Green_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_oyster_black",
					name: "Oyster / Black",
					imageUrl: "/configurator/Seitona_VK63/Браслет/Oyster_Black.png",
					priceModifier: 0,
				},
				{
					id: "braslet_white_black",
					name: "White / Black",
					imageUrl: "/configurator/Seitona_VK63/Браслет/White_Black.png",
					priceModifier: 0,
				},
			],
			dials: [
				{
					id: "dial_black",
					name: "Black",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Black.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_rose_gold",
					name: "Black Rose Gold",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Black_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_black_yellow_gold",
					name: "Black Yellow Gold",
					imageUrl:
						"/configurator/Seitona_VK63/Циферблат/Black_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_blue_ocean",
					name: "Blue Ocean",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Blue_Ocean.png",
					priceModifier: 0,
				},
				{
					id: "dial_champagne",
					name: "Champagne",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Champagne.png",
					priceModifier: 0,
				},
				{
					id: "dial_gold",
					name: "Gold",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Gold.png",
					priceModifier: 0,
				},
				{
					id: "dial_green",
					name: "Green",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Green.png",
					priceModifier: 0,
				},
				{
					id: "dial_ice_blue",
					name: "Ice Blue",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Ice_Blue.png",
					priceModifier: 0,
				},
				{
					id: "dial_meteor",
					name: "Meteor",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Meteor.png",
					priceModifier: 0,
				},
				{
					id: "dial_panda",
					name: "Panda",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/Panda.png",
					priceModifier: 0,
				},
				{
					id: "dial_white_green",
					name: "White / Green",
					imageUrl: "/configurator/Seitona_VK63/Циферблат/White_Green.png",
					priceModifier: 0,
				},
				{
					id: "dial_white_yellow_gold",
					name: "White / Yellow / Gold",
					imageUrl:
						"/configurator/Seitona_VK63/Циферблат/White_Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			cases: [
				{
					id: "case_black",
					name: "Black",
					imageUrl: "/configurator/Seitona_VK63/Корпус/Black.png",
					priceModifier: 0,
				},
				{
					id: "case_silver",
					name: "Silver",
					imageUrl: "/configurator/Seitona_VK63/Корпус/Silver.png",
					priceModifier: 0,
				},
				{
					id: "case_silver_rose_gold",
					name: "Silver Rose Gold",
					imageUrl: "/configurator/Seitona_VK63/Корпус/Silver_Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_silver_yellow_gold",
					name: "Silver Yellow Gold",
					imageUrl: "/configurator/Seitona_VK63/Корпус/Silver_Yellow_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seitona_VK63/Корпус/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "case_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seitona_VK63/Корпус/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			main_arrows: [
				{
					id: "main_arrow_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seitona_VK63/Стрелки/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_silver",
					name: "Silver",
					imageUrl: "/configurator/Seitona_VK63/Стрелки/Silver.png",
					priceModifier: 0,
				},
			],
			second_arrows: [
				{
					id: "main_arrow_rose_gold",
					name: "Rose Gold",
					imageUrl:
						"/configurator/Seitona_VK63/Секундная_стрелка/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "main_arrow_silver",
					name: "Silver",
					imageUrl: "/configurator/Seitona_VK63/Секундная_стрелка/Silver.png",
					priceModifier: 0,
				},
			],
			bezels: [
				{
					id: "bezel_black_rose",
					name: "Black Rose",
					imageUrl: "/configurator/Seitona_VK63/Безель/Black_Rose.png",
					priceModifier: 0,
				},
				{
					id: "bezel_black_yellow",
					name: "Black Yellow",
					imageUrl: "/configurator/Seitona_VK63/Безель/Black_Yellow.png",
					priceModifier: 0,
				},
				{
					id: "bezel_black",
					name: "Black",
					imageUrl: "/configurator/Seitona_VK63/Безель/Black.png",
					priceModifier: 0,
				},
				{
					id: "bezel_blue",
					name: "Blue",
					imageUrl: "/configurator/Seitona_VK63/Безель/Blue.png",
					priceModifier: 0,
				},
				{
					id: "bezel_brown",
					name: "Brown",
					imageUrl: "/configurator/Seitona_VK63/Безель/Brown.png",
					priceModifier: 0,
				},
				{
					id: "bezel_green",
					name: "Green",
					imageUrl: "/configurator/Seitona_VK63/Безель/Green.png",
					priceModifier: 0,
				},
				{
					id: "bezel_rose_gold",
					name: "Rose Gold",
					imageUrl: "/configurator/Seitona_VK63/Безель/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "bezel_silver",
					name: "Silver",
					imageUrl: "/configurator/Seitona_VK63/Безель/Silver.png",
					priceModifier: 0,
				},
				{
					id: "bezel_yellow_gold",
					name: "Yellow Gold",
					imageUrl: "/configurator/Seitona_VK63/Безель/Yellow_Gold.png",
					priceModifier: 0,
				},
			],
			subdial_arrows: [
				{
					id: "bezel_rose_gold",
					name: "Rose Gold",
					imageUrl:
						"/configurator/Seitona_VK63/Дополнительные_стрелки/Rose_Gold.png",
					priceModifier: 0,
				},
				{
					id: "bezel_silver",
					name: "Silver",
					imageUrl:
						"/configurator/Seitona_VK63/Дополнительные_стрелки/Silver.png",
					priceModifier: 0,
				},
			],
			engraving: { price: 15000, maxLength: 20 },
		},
	},
];
