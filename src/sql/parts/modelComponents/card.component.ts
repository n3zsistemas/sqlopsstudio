/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import 'vs/css!./flexContainer';

import { Component, Input, Inject, ChangeDetectorRef, forwardRef, ComponentFactoryResolver,
	ViewChild, ViewChildren, ElementRef, Injector, OnDestroy, QueryList,
} from '@angular/core';

import * as sqlops from 'sqlops';

import { DashboardServiceInterface } from 'sql/parts/dashboard/services/dashboardServiceInterface.service';
import { ComponentBase } from 'sql/parts/modelComponents/componentBase';
import { IComponent, IComponentDescriptor, IModelStore } from 'sql/parts/modelComponents/interfaces';

@Component({
	template: `
		<div *ngIf="label" class="cardComponent" style="position: absolute; height: 100%; width: 100%; margin: 10px 0px 10px 0px;">
			<span style="margin-left: 10px; display: inline-block;">
				<div style="font-size: 11px; font-weight: lighter">{{label}}</div>
				<div>{{value}}</div>
			</span>
		</div>
	`
})
export default class CardComponent extends ComponentBase implements IComponent, OnDestroy {
	@Input() descriptor: IComponentDescriptor;
	@Input() modelStore: IModelStore;

	constructor(@Inject(forwardRef(() => ChangeDetectorRef)) changeRef: ChangeDetectorRef) {
		super(changeRef);
	}

	ngOnInit(): void {
		this.baseInit();
	}

	ngOnDestroy(): void {
		this.baseDestroy();
	}

	/// IComponent implementation

	public layout(): void {
		this._changeRef.detectChanges();
	}

	public setLayout (layout: any): void {
		// TODO allow configuring the look and feel
		this.layout();
	}

	// CSS-bound properties

	public get label(): string {
		return this.getPropertyOrDefault<sqlops.CardProperties, string>((props) => props.label, '');
	}

	public get value(): string {
		return this.getPropertyOrDefault<sqlops.CardProperties, string>((props) => props.value, '');
	}

	public get actions(): sqlops.ActionDescriptor[] {
		return this.getPropertyOrDefault<sqlops.CardProperties, sqlops.ActionDescriptor[]>((props) => props.actions, []);
	}

}
